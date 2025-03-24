import { User } from "../models/user.mjs";
import bcrypt from "bcryptjs";

export const registerHandler = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashadPassword = await bcrypt.hash(password, salt);
    const user = new User({ email: email, password: hashadPassword, age: age, name:name });
    await user.save();
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect("/users");
      });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" });
  }
};
