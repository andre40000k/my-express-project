import users from "../../database/users.json" with  { type: "json" };
import jwt from "jsonwebtoken";
import configuration from "./authConfiguration.mjs"

const {JWT_SECRET, COOKIE_OPTIONS} = configuration;

export const loginHandler = (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "Невірний логін" });
    }

    const isMatch = user.password == password ? true : false;
    if (!isMatch) {
      return res.status(400).json({ message: "Невірний пароль" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ message: "Успішний вхід" });
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера1" });
  }
};
