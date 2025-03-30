import { Article } from "../../models/article.mjs";

export const getStatisticsHandler = async (req, res) => {
  try {
    const newestArticle = await Article.findOne()
      .sort({ createdAt: -1 })
      .select("title createdAt _id content")
      .lean();

    const oldestArticle = await Article.findOne()
      .sort({ createdAt: 1 })
      .select("title createdAt _id content")
      .lean();

    const longestArticle = await Article.aggregate([
      {
        $project: {
          title: 1,
          createdAt: 1,
          content: 1,
          contentLength: { $strLenCP: "$content" },
        },
      },
      { $sort: { contentLength: -1 } },
      { $limit: 1 },
    ]);

    res.render("ejs/statisticArticle.ejs", {
      newestArticle,
      oldestArticle,
      longestArticle: longestArticle[0] || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
