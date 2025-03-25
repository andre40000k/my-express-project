import express from "express";
import { getArticleByIdHandler } from "../controllers/articles/getArticleByIdHandler.mjs";
import { getArticlesHandler } from "../controllers/articles/getArticlesHandler.mjs";
import { addArticleHandler } from "../controllers/articles/addArticleHandler.mjs";

const articlesRouter = express.Router();

articlesRouter.route("/list").get(getArticlesHandler);
articlesRouter.route("/list/:articleId").get(getArticleByIdHandler);

articlesRouter.route("/add")
  .get(addArticleHandler)
  .post(addArticleHandler);

export default articlesRouter;