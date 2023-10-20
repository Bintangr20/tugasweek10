// usersRoute.js
const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

router.post("/users/register", usersController.registerUser);
router.post("/users/login", usersController.login);
//get by pagination /users?page=$1&limit=$2
router.get("/users", usersController.getUsersByPage);

module.exports = router;
