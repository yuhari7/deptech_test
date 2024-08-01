import { readData, writeData } from "../helper/readAndWriteData.js";

// Endpoints for Transactions
export const getAllTransaction = (req, res) => {
  const transactions = readData("db/transactions.json");
  res.json(transactions);
};

export const getTransactionById = (req, res) => {
  const transactions = readData("db/transactions.json");
  const transaction = transactions.find(
    (t) => t.id === parseInt(req.params.id)
  );
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).send("Transaction not found");
  }
};

export const createTransaction = (req, res) => {
  const transactions = readData("db/transactions.json");
  const newTransactionId = transactions[transactions.length - 1].id + 1;
  const products = readData("db/products.json");
  const newTransaction = Object.assign({ id: newTransactionId }, req.body);
  transactions.push(newTransaction);

  // Update product stock
  newTransaction.details.forEach((detail) => {
    const product = products.find((p) => p.id === detail.productId);
    if (newTransaction.transactionType === "StockIn") {
      product.stock += detail.quantity;
    } else if (newTransaction.transactionType === "StockOut") {
      product.stock -= detail.quantity;
    }
  });
  writeData("db/products.json", products);
  writeData("db/transactions.json", transactions);
  res.status(201).json(newTransaction);
};

export const editTransaction = (req, res) => {
  const transactions = readData("db/transactions.json");
  const transactionIndex = transactions.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );
  if (transactionIndex === -1) {
    return res.status(404).send("Transaction not found");
  }

  const updatedTransaction = { ...transactions[transactionIndex], ...req.body };
  transactions[transactionIndex] = updatedTransaction;

  // Update product stock based on updated transaction details
  const products = readData("db/products.json");
  updatedTransaction.details.forEach((detail) => {
    const product = products.find((p) => p.id === detail.productId);
    if (updatedTransaction.transactionType === "StockIn") {
      product.stock += detail.quantity;
    } else if (updatedTransaction.transactionType === "StockOut") {
      product.stock -= detail.quantity;
    }
  });

  writeData("db/products.json", products);
  writeData("db/transactions.json", transactions);
  res.json(updatedTransaction);
};

export const deleteTransaction = (req, res) => {
  const transactions = readData("db/transactions.json");
  const transactionIndex = transactions.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );
  if (transactionIndex === -1) {
    return res.status(404).send("Transaction not found");
  }

  transactions.splice(transactionIndex, 1);
  writeData("db/transactions.json", transactions);
  res.status(204).send();
};
