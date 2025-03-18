import express from "express";
const router = express.Router();

router.post("/theme", (req, res) => {
  const { theme } = req.body;
  res.cookie("theme", theme, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  const redirectUrl = req.get("Referrer") || "/";
  res.redirect(redirectUrl);
});

export default router;
 