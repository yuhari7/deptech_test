import express from "express";
import {
  getAllTransaction,
  getTransactionById,
  createTransaction,
  editTransaction,
  deleteTransaction,
} from "../Controller/transactionController.js";

const router = express.Router();

router.route("/").get(getAllTransaction).post(createTransaction);
router
  .route("/:id")
  .get(getTransactionById)
  .patch(editTransaction)
  .delete(deleteTransaction);

export { router as TransactionRouter };
