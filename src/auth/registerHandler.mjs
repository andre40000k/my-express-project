import { User } from "../models/user.mjs";

export const registerHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const user = new User({ email, password });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" });
  }
};
