const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/UserController");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
module.exports = router;
