/* eslint-disable */
const app = require("express");
const multer = require("multer");
const login = require("../Controllers/Login.controller");
const GameRouter = require("./game");
const dataImg = require("../Controllers/Upload.controller");
const PlayerRouter = require("./player");
const History = require("./history");

const router = app.Router();
const upload = multer({ dest: "/tmp" });

router.use("/players", PlayerRouter);
router.use("/games", GameRouter);
router.use("/history", History);

// login handler
router.post("/auth/login", login);

// upload router
router.post("/upload", upload.single("data-binary"), dataImg.uploadImage);

module.exports = router;
