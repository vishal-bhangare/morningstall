const express = require("express");
const booksRoute = express.Router();
const Books = require("../models/Books");
const { convertToMongoQuery } = require("../utils/functions");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const multer = require("multer");
const config = require("../config/firebase.config");
initializeApp(config.firebaseConfig);
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

booksRoute.route("/filters").get((req, res, next) => {
  Books.aggregate([
    {
      $group: {
        _id: null,
        genre: { $addToSet: "$genre" },
        language: { $addToSet: "$language" },
      },
    },
  ])
    .then((data) => {
      res.status(200).json({
        genre: data[0].genre,
        language: data[0].language,
        sortBy: ["recent_added", "popularity", "published_year"],
      });
    })
    .catch((err) => next(err));
});

booksRoute.route("/:page").get((req, res, next) => {
  const queryParams = req.query;

  const page = req.params.page;
  const limit = queryParams.limit || 10;
  // sortBy = [recent_added, popularity, published_year]
  let options = {};
  const sortOrder = queryParams.sortOrder == "desc" ? -1 : 1;

  if (queryParams.sortBy === "recent_added")
    options = { sort: { added_on: sortOrder } };

  // ratings should added later on
  if (queryParams.sortBy === "popularity")
    options = { sort: { views: sortOrder, favorites: sortOrder } };

  if (queryParams.sortBy === "published_year")
    options = { sort: { publicationYear: sortOrder } };

  const query = convertToMongoQuery(queryParams, [
    "sortBy",
    "sortOrder",
    "limit",
  ]);

  Books.countDocuments(query).then((total) => {
    const totalPages = Math.ceil(total / limit);

    options =
      limit !== -1 ? { ...options, skip: limit * page, limit: limit } : {};

    Books.find(query, {}, options)
      .then((data) => {
        res.status(200).json({
          status: 1,
          books: data,
          totalPages: totalPages,
          hasMore: page + 1 < totalPages,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
});

booksRoute.route("/search").get((req, res, next) => {
  const query = {
    $text: { $search: req.query.q },
  };
  if (req.query.lang) query.language = req.query.lang;
  if (req.query.genre) query.genre = req.query.genre;
  if (req.query.edition) query.edition = req.query.edition;

  console.log(query);
  Books.find(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return next(err);
    });
});

booksRoute.route("/book/:id").get((req, res, next) => {
  Books.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return next(err);
    });
});

booksRoute.route("/book/viewed/:id").patch((req, res, next) => {
  Books.updateOne({ _id: req.params.id }, { $inc: { views: 1 } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return next(err);
    });
});

async function uploadFile(file, folder) {
  try {
    const storageRef = ref(storage, `${folder}/${file.originalname}`);
    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File successfully uploaded.");
    return downloadURL;
  } catch (error) {
    return error;
  }
}

downloadUrls = { pdf: "", coverPage: "" };

booksRoute.route("/").post(
  upload.fields([
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "coverPage",
      maxCount: 1,
    },
  ]),
  (req, res, next) => {
    uploadFile(req.files["pdf"][0], "pdfs")
      .then((url) => {
        downloadUrls.pdf = url;
        uploadFile(req.files["coverPage"][0], "coverPages")
          .then((url) => {
            downloadUrls.coverPage = url;
            Object.assign(req.body, downloadUrls, {
              views: 0,
              favorite: 0,
              likes: 0,
              added_on: new Date(),
              tags: req.body.tags.split(","),
            });
            Books.create(req.body)
              .then((data) => {
                res.status(200).json(data);
              })
              .catch((err) => {
                return next(err);
              });
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
);

module.exports = booksRoute;
