export const themeHandler = (req, res) => {
  const { theme } = req.body;

 if (!["light", "dark"].includes(theme)) {
   return res.status(400).json({ error: "Invalid theme" });
 }

  res.cookie("theme", theme, {
    maxAge: 10 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  const redirectUrl = req.get("Referrer") || "/";
  res.redirect(redirectUrl);
}