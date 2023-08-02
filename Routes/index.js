const login = require("../Controllers/Login.controller.js");
const GameRouter = require("./game.js");
const PlayerRouter = require("./player.js");
const History = require("./history.js");
const Upload = require("./upload.js");
const app = require("express");
const router = app.Router();

router.use("/players", PlayerRouter);
router.use("/games", GameRouter);
router.use("/history", History);
router.use("/upload", Upload);

// login handler
router.post("/auth/login", login);
module.exports = router;
