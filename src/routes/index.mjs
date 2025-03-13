import express from "express";
import rootRouter from "./root.mjs";
import usersRouter from "./users.mjs";
import articlesRouter from "./articles.mjs";

const router = express.Router();

router.use("/", rootRouter);
router.use("/users", usersRouter);
router.use("/articles", articlesRouter);

export default router;