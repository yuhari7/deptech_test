import { Role } from "../utils/models/index.js";

// Create a new role
export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error creating role",
      details: error.message,
    });
  }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching roles", details: error.message });
  }
};

// Get role by ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error fetching role",
      details: error.message,
    });
  }
};

// Update role
export const updateRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating role", details: error.message });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    await role.destroy();
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting role", details: error.message });
  }
};
