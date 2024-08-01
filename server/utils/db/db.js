import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { Sequelize } from "sequelize";

// Replace with your actual database connection details
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Enable logging for debugging
  }
);

const syncDb = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDb();
