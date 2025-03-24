import { User } from "../models/user.mjs";
import bcrypt from "bcryptjs";

export const registerHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashadPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashadPassword });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" });
  }
};
