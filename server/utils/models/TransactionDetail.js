import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Product } from "./Product.js";
import { Transaction } from "./Transaction.js";

export const TransactionDetail = sequelize.define(
  "TransactionDetail",
  {
    transactionId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "transaction_details",
    timestamps: false,
  }
);
