import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import {
  AdminRouter,
  CategoryRouter,
  ProductRouter,
  TransactionRouter,
} from "./routes/routes.js";

const app = express();
app.use(bodyParser.json());

// 1) Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use("/api/v1/admins", AdminRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/transactions", TransactionRouter);

export default app;
