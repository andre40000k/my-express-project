import { Article } from "../../models/article.mjs";

export const removeArticleByIdHandler = async (req, res) => {
  try {
    const result = await Article.deleteOne({ _id: req.params.articleId });

    if (result.deletedCount > 0) {
      res.redirect("/articles/list");
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).send("Error deleting article");
  }
};
