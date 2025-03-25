import { Article } from "../../models/article.mjs";

export const getArticleByIdHandler = async (req, res) => {
  const article = await Article.findById(req.params.articleId);
  if (article) {
    res.render("ejs/article.ejs", { article });
  } else {
    res.status(404).send("Not found");
  }
};
