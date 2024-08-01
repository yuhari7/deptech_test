import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Role = sequelize.define(
  "Role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);
