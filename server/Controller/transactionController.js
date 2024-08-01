import {
  Product,
  Transaction,
  TransactionDetail,
} from "../utils/models/index.js";

// Create a transaction
export const createTransaction = async (req, res) => {
  const { transactionType, details } = req.body;

  if (!transactionType || !details || !Array.isArray(details)) {
    return res.status(400).json({ error: "Invalid transaction data" });
  }

  try {
    // Create the transaction record
    const newTransaction = await Transaction.create({ transactionType });

    // Process each product in the transaction details
    for (const item of details) {
      const { productId, quantity } = item;

      // Check if product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        return res
          .status(400)
          .json({ error: `Invalid productId: ${productId}` });
      }

      // Check stock availability for StockOut transactions
      if (transactionType === "StockOut" && product.stock < quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for productId: ${productId}` });
      }

      // Update product stock
      product.stock =
        transactionType === "StockIn"
          ? product.stock + quantity
          : product.stock - quantity;
      await product.save();

      // Create transaction detail record
      await TransactionDetail.create({
        transactionId: newTransaction.id,
        productId,
        quantity,
      });
    }

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res
      .status(500)
      .json({ error: "Error creating transaction", details: error.message });
  }
};

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [{ model: TransactionDetail, include: [Product] }],
    });
    res.json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error fetching transactions" });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id, {
      include: [{ model: TransactionDetail, include: [Product] }],
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching transaction", details: error.message });
  }
};

// Update a transaction (typically not updated, but included for completeness)
export const editTransaction = async (req, res) => {
  const { id } = req.params;
  const { transactionType, details } = req.body;

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transactionType) transaction.transactionType = transactionType;
    await transaction.save();

    // Update transaction details
    if (details && Array.isArray(details)) {
      // (additional logic for updating details if necessary)
    }

    res.json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating transaction", details: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await transaction.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting transaction", details: error.message });
  }
};
