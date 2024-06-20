const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserByUsername,
  getUserByEmail,
} = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "zeeshan_ahmed",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const profile = (req, res) => {
  res
    .status(200)
    .json({ userId: req.user.userId, username: req.user.username });
};

module.exports = {
  register,
  login,
  profile,
};
