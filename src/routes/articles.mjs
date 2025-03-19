import express from "express";

import {
  getArticleByIdHandler,
  getArticlesHandler
} from "../controllers/articles.mjs";

const articlesRouter = express.Router();

articlesRouter.route("/").get(getArticlesHandler);

articlesRouter.route("/:articleId").get(getArticleByIdHandler)

export default articlesRouter;