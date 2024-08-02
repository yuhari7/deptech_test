import { User, Role } from "../utils/models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Create a new admin
export const createUser = async (req, res) => {
  const { firstName, lastName, email, birthDate, gender, password, roleId } =
    req.body;

  try {
    // Check if email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: `Email already in use: ${email}` });
    }

    // Check if role exists
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ error: `Invalid roleId: ${roleId}` });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      birthDate,
      gender,
      password: hashedPassword,
      roleId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Error creating user", details: error.message });
  }
};

// Get all admins
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error fetching users" });
  }
};

// Get admin by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Update admin
export const editUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, birthDate, gender, password, roleId } =
    req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (roleId) {
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(400).json({ error: `Invalid roleId: ${roleId}` });
      }
      user.roleId = roleId;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.birthDate = birthDate || user.birthDate;
    user.gender = gender || user.gender;

    await user.save();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
};

// Delete admin
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    await user.destroy();
    res.json({ message: "user successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
};

// // Logout user
// export const logoutUser = (req, res) => {
//   // For JWT, logout is handled client-side by removing the token
//   res.json({ message: "Logged out successfully" });
// };
