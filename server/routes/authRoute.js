import express from "express";
import { loginUser, logoutUser } from "../Controller/authController.js"; // Adjust path as necessary

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export { router as AuthRouter };
