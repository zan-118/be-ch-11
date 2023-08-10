const Router = require("express").Router();
const players = require("../Controllers/User.controller");
const authOnly = require("../middlewares/auth");

Router.post("/", players.register);
Router.get("/", authOnly, players.getPlayers);
Router.get("/:id", authOnly, players.getPlayerById);
Router.put("/:id", authOnly, players.updatePlayer);
Router.delete("/:id", authOnly, players.deletePlayer);
Router.put("/image/:id", players.updateImage);

module.exports = Router;
