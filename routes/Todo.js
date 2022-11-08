const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const todoController = require("../controller/TodoController");

router.get("/", todoController.getTodos);
router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .notEmpty()
      .escape()
      .withMessage("Title must be at least 5 chars long"),
      body("status")
      .isBoolean()
      .withMessage("Status must be boolean"),
  ],
  todoController.createTask
);

router.put(
  "/:id",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 chars long"),
    body("status")
      .isBoolean()
      .withMessage("Status must be boolean"),
  ],
  todoController.updateTodo
);

router.get("/:id",todoController.getById);

router.delete("/:id", todoController.deleteTodo);
module.exports = router;
