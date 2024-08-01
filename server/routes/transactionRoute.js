import express from "express";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  editTransaction,
  deleteTransaction,
} from "../Controller/transactionController.js";

const router = express.Router();

router.route("/").get(getAllTransactions).post(createTransaction);
router
  .route("/:id")
  .get(getTransactionById)
  .patch(editTransaction)
  .delete(deleteTransaction);

export { router as TransactionRouter };
