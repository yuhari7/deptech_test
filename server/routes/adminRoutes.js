import express from "express";
import {
  getAllAdmins,
  createAdmin,
  getAdminById,
  editAdmin,
  deleteAdmin,
} from "../Controller/adminController.js";

const router = express.Router();

router.route("/").get(getAllAdmins).post(createAdmin);
router.route("/:id").get(getAdminById).patch(editAdmin).delete(deleteAdmin);

export { router as AdminRouter };
