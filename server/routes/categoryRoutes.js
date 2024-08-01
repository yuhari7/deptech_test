import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
} from "../Controller/categoryController.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .patch(editCategory)
  .delete(deleteCategory);

export { router as CategoryRouter };
