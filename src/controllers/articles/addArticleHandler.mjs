import { Article } from "../../models/article.mjs";

export const addArticleHandler = async (req, res) => {
  try {
    res.render("ejs/addArticle.ejs");
    const { title, content } = req.body;
    console.log(title);
    console.log(content);


    if(title !== undefined && content !== undefined)
    {
      const article = new Article({ title: title, content: content });
      await article.save();
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
