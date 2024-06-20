const db = require("../config/db");

const createUser = async (username, email, password) => {
  const [result] = await db.execute(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return result;
};

const getUserByUsername = async (username) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserByEmail,
};
