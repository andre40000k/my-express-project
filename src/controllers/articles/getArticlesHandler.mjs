import { Article } from "../../models/article.mjs";

export const getArticlesHandler = async (req, res) => {
  try {
    const limit = 10;
    const { lastId, direction } = req.query;

    let query = {};
    let sortDirection = 1;

    if (lastId) {
      if (direction === "prev") {
        query = { _id: { $lt: lastId } };
        sortDirection = -1;
      } else {
        query = { _id: { $gt: lastId } };
      }
    }

    let articles = await Article.find(query).sort({ _id: sortDirection }).limit(limit).lean();

    if (direction === "prev") {
      articles.reverse();
    }

    // TODO FIX PAGINATION let a = await Article.countDocuments({ _id: { $lt: firstArticleId } });

    const hasNext = articles.length === limit;
    console.log(req.query);
    const hasPrev = !!lastId;

    const nextLastId = hasNext ? articles[articles.length - 1]?._id : null;
    const prevLastId = hasPrev ? articles[0]?._id : null;

    res.render("ejs/articles.ejs", {
      articles,
      hasNext,
      hasPrev,
      nextLastId,
      prevLastId
    });
  } catch (error) {
    console.error("Cann`t get articles:", error);
  }
};
