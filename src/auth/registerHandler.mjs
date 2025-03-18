import users from "../../database/users.json" with  { type: "json" };
import jwt from "jsonwebtoken";
import configuration from "./authConfiguration.mjs"

const {JWT_SECRET, COOKIE_OPTIONS} = configuration;

export const registerHandler = (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "Користувач вже існує" });
    }

    const newUser = {
      id: Date.now(),
      email,
      password: password,
    };

    users.push(newUser);

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ message: "Користувача створено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};
