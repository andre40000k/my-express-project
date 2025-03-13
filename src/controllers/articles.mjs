import {articles} from "../../database/data.mjs";

export const getArticlesHandler = (req, res) => {
    res.render("ejs/articles.ejs", { articles: articles });
}

export const getArticleByIdHandler = (req, res) => {
  const article = articles.find((a) => a.id == req.params.articleId);
  if (article) {
    res.render("ejs/article.ejs", { article });
  } else {
    res.status(404).send("Not found");
  }
};