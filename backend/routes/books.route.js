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
  Books.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return next(err);
    });
});
booksRoute.route("/books/:id").get((req, res, next) => {
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
data = {};
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
            Object.assign(req.body, downloadUrls, { views: 0, favorite: 0 });

            Books.create(req.body)
              .then((data) => {
                res.status(200).json(data);
              })
              .catch((err) => {
                return next(err);
              });
          })
          .catch((err) => res.status(402).res.send(err));
      })
      .catch((err) => res.status(402).res.send(err));
  }
);
const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = booksRoute;
