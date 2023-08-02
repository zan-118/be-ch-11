const multer = require("multer");
const fs = require("fs");
const path = require('path');
const Router = require("express").Router();

const { uploadImage } = require("../middlewares/cloudinary");

const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

Router.post(
  "/",
  multer({ storage: diskStorage }).single("foto_from_client"),
  async (req, res) => {
    const upload = await uploadImage(req.file.path);
    await fs.unlinkSync(req.file.path);
    res.send("Upload sukses");
  }
);

module.exports = Router;
