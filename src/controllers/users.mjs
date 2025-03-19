import users from "../../database/users.json" with  { type: "json" };

export const getUsersHandler = (req, res) => {
  res.render("pug/users", { users: users });
};

export const getUserByIdHandler = (req, res) => {
  const user = users.find((u) => u.id == req.params.userId);
  if (user) {
    res.render("pug/user", { user });
  } else {
    res.status(404).send("User not found");
  }
};