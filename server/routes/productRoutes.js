import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} from "../Controller/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(editProduct)
  .delete(deleteProduct);

export { router as ProductRouter };
