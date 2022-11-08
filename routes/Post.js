const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const postController = require("../controller/PostController");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 chars long"),
    body("content")
      .notEmpty()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Content must be at least 5 chars long"),
  ],
  postController.createPost
);

router.put(
  "/:id",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 chars long"),
    body("content")
      .notEmpty()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Content must be at least 5 chars long"),
  ],
  postController.updatePost
);

router.delete("/:id", postController.deletePost);
module.exports = router;
