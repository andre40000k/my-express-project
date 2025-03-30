import { Article } from "../../models/article.mjs";

export const getArticlesHandler = async (req, res) => {
   try {
     const page = parseInt(req.query.page) || 1;
     const limit = 10;
     const skip = (page - 1) * limit;

     const totalArticles = await Article.countDocuments();
     const totalPages = Math.ceil(totalArticles / limit);

     const articles = await Article.find()
       .sort({ createdAt: -1 })
       .skip(skip)
       .limit(limit);

     res.render("ejs/articles.ejs", {
       articles,
       currentPage: page,
       totalPages,
     });
   } catch (err) {
     console.error(err);
     res.status(500).send("Server Error");
   }
};
