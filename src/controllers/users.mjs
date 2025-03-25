import { User } from "../models/user.mjs";

export const getUsersHandler = async (req, res) => {
  res.render("pug/users", { users: await User.find() });
};

export const getUserByIdHandler = async (req, res) => {
  
  const { userId } = req.params;
  const user = await User.findById(userId);

  console.log(user)
  if (user) {
    res.render("pug/user", { user });
  } else {
    res.status(404).send("User not found");
  }
};