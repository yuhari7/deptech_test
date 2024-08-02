import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  editUser,
  deleteUser,
  // loginUser,
  // logoutUser,
} from "../Controller/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).patch(editUser).delete(deleteUser);

export { router as UserRouter };
