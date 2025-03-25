import { Article } from "../../models/article.mjs";

export const getArticlesHandler = async (req, res) => {
  res.render("ejs/articles.ejs", { articles: await Article.find()});
};
