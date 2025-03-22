export const logoutHandler = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error on exit:", err);
      return res.status(500).send("Server Error");
    }
    res.redirect("/");
  });
};

export default logoutHandler;
