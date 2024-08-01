import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

// Define the Category model
export const Category = sequelize.define(
  "Category",
  {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);
