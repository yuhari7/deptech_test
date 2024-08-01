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
} from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// 1) Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use("/api/v1/roles", RoleRouter);
app.use("/api/v1/admins", UserRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/transactions", TransactionRouter);

export default app;
