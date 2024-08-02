import {
  Product,
  Transaction,
  TransactionDetail,
} from "../utils/models/index.js";

// Create a transaction
export const createTransaction = async (req, res) => {
  const { transactionType, details } = req.body;

  try {
    const transaction = await Transaction.create({ transactionType });

    if (details && Array.isArray(details)) {
      const transactionDetails = await Promise.all(
        details.map(async (detail) => {
          const { productId, quantity } = detail;
          const product = await Product.findByPk(productId);

          if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
          }

          if (product.stock < quantity) {
            throw new Error(
              `Insufficient stock for product ${product.productName}`
            );
          }

          product.stock -= quantity;
          await product.save();

          return TransactionDetail.create({
            transactionId: transaction.id,
            productId,
            quantity,
          });
        })
      );

      transaction.setTransactionDetails(transactionDetails);
    }

    res.status(201).json(transaction);
  } catch (error) {
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
