import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../utils/models/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, roleId: user.roleId },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
};

// Logout
export const logoutUser = (req, res) => {
  // Token invalidation logic can be added here if using a token blacklist
  res.status(200).json({ message: "Logout successful" });
};
