const express = require("express");
const booksRoute = express.Router();
const Books = require("../models/Books");
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

booksRoute.route("/").get((req, res, next) => {
  let query = {};
  s;
  let tags = Object.values(req.query);
  if (tags.length) query.tags = { $all: tags };
  Books.find(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return next(err);
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

booksRoute.route("/:id").get((req, res, next) => {
  Books.findById(req.params.id)
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

booksRoute.route("/add").post(
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
const getDateDiff = (diff) => {
  diffsec = diff / 1000;
  if (diffsec < 60) return diffsec + " seconds";
  else if (diffsec >= 60 && diffsec < 3600)
    return Math.floor(diffsec / 60) + " minutes";
  else if (diffsec >= 3600 && diffsec < 86400)
    return Math.floor(diffsec / 3600) + " hrs";
  else if (diffsec >= 86400 && diffsec < 2592000)
    return diffsec / 86400 + " days";
  else if (diffsec >= 2592000 && diffsec < 31536000)
    return Math.floor(diffsec / 2592000) + " months";
  else if (diffsec >= 31536000) return Math.floor(diffsec / 31536000) + " yrs";
};
// const today = new Date("2023-08-08T05:20:02.144Z");
// const prev = new Date("2023-07-09T05:20:02.144Z");
// const diff = today - prev;

// console.log(getDateDiff(diff));
module.exports = booksRoute;
