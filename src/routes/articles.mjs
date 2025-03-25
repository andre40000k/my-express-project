import express from "express";
import { getArticleByIdHandler } from "../controllers/articles/getArticleByIdHandler.mjs";
import { getArticlesHandler } from "../controllers/articles/getArticlesHandler.mjs";
import { addArticleHandler } from "../controllers/articles/addArticleHandler.mjs";
import { removeArticleByIdHandler } from "../controllers/articles/removeArticleByIdHandler.mjs";

const articlesRouter = express.Router();

articlesRouter.route("/list").get(getArticlesHandler);
articlesRouter.route("/list/:articleId").get(getArticleByIdHandler);

articlesRouter.route("/add")
  .get(addArticleHandler)
  .post(addArticleHandler);

articlesRouter
  .route("/remove/:articleId")
  .post(removeArticleByIdHandler);
  
export default articlesRouter;