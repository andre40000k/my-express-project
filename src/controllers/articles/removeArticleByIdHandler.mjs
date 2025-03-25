export const removeArticleByIdHandler = (req, res) => {
  const article = articles.find((a) => a.id == req.params.articleId);
  if (article) {
    res.render("ejs/ticle.ejs", { article });
  } else {
    res.status(404).send("Not found");
  }
};
