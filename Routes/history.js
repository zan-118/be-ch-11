const Router = require("express").Router();
const history = require("../Controllers/History.controller");
const authOnly = require("../middlewares/auth");

Router.post("/", authOnly, history.postHistory);
Router.get("/:user_id", authOnly, history.getHistory);
module.exports = Router;

// notes api - public / private
