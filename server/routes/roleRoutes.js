import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../Controller/roleController.js";

const router = express.Router();

router.route("/").get(getAllRoles).post(createRole);

router.route("/:id").get(getRoleById).patch(updateRole).delete(deleteRole);

export { router as RoleRouter };
