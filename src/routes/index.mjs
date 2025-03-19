import express from "express";
import rootRouter from "./root.mjs";
import usersRouter from "./users.mjs";
import articlesRouter from "./articles.mjs";
import authRouter from "./auth.mjs"
import themeRouter from "./theme.mjs"

const router = express.Router();

router.use("/", rootRouter);
router.use("/users", usersRouter);
router.use("/articles", articlesRouter);
router.use("/auth", authRouter);
router.use("/settings", themeRouter);

export default router;