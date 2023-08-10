const Router = require("express").Router();
const gameRoom = require("../Controllers/Game.controller");
const authOnly = require("../middlewares/auth");

Router.post("/rooms", authOnly, gameRoom.createRoom);
Router.get("/rooms", gameRoom.getRooms);
Router.get("/rooms/:id", gameRoom.getRoomById);
Router.post("/rooms/:id/plays", authOnly, gameRoom.updateScore);
// Router.post("/rooms/delete", gameRoom.deleteAllGames);
// Router.post("/rooms/createmany", gameRoom.bulkCreate);

module.exports = Router;
