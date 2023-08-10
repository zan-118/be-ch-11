const UserController = require("../Controllers/usersController");
const authOnly = require("../middlewares/auth");
const Router = require("express").Router();

Router.post("/", UserController.postUsersHandler);
Router.get("/", authOnly, UserController.getAllUsersHandler);
Router.get("/:id", authOnly, UserController.getUserByIdHandler);
Router.put("/:id", authOnly, UserController.putUserHandler);
Router.delete("/:id", authOnly, UserController.deleteUserHandler);

module.exports = Router;
