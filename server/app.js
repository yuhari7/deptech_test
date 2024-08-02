import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import {
  UserRouter,
  CategoryRouter,
  ProductRouter,
  TransactionRouter,
  RoleRouter,
  AuthRouter,
} from "./routes/routes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { upload } from "./middleware/multer.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(morgan("dev")); // Logging requests
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // Add timestamp to requests
  next();
});

// Public Routes
app.use("/api/v1/auth", AuthRouter);

// Protected Routes
// app.use("/api/v1/roles", authenticateToken, RoleRouter);
// app.use("/api/v1/admins", authenticateToken, UserRouter);
// app.use("/api/v1/categories", authenticateToken, CategoryRouter);
// app.use(
//   "/api/v1/products",
//   authenticateToken,
//   upload.single("productImage"),
//   ProductRouter
// );
// app.use(
//   "/api/v1/transactions",
//   authenticateToken,
//   upload.single("productImage"),
//   TransactionRouter
// );
app.use("/api/v1/roles", RoleRouter);
app.use("/api/v1/admins", UserRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/transactions", TransactionRouter);

export default app;
