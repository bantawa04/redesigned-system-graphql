const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const productController = require("../controller/ProductController");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  [
    body("title")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 chars long"),
    body("price")
      .notEmpty()
      .escape()
      .isNumeric(),
    body("description")
      .notEmpty()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 chars long"),
  ],
  productController.createProduct
);

router.put(
  "/:id",
  [
    body("title")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 chars long"),
    body("price")
      .notEmpty()
      .escape()
      .isLength({ min: 5 })
      .isNumeric(),
    body("description")
      .notEmpty()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 chars long"),
  ],
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);
module.exports = router;
