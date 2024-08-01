import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { TransactionDetail } from "./TransactionDetail.js";

export const Transaction = sequelize.define(
  "Transaction",
  {
    transactionType: {
      type: DataTypes.ENUM("StockIn", "StockOut"),
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "transactions",
    timestamps: false,
  }
);
