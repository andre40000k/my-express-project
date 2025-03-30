import { fa, faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { Article } from "../../models/article.mjs";

const TOTAL_ARTICLES = 50;

export const generateArticleHandler = async (req, res) => {
    try {
      let articles = [];

      for (let i = 0; i < TOTAL_ARTICLES; i++) {
        articles.push({
          _id: uuidv4(),
          title: faker.lorem.sentence(1),
          content: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 10 })),
          createdAt: faker.date.past({ years: 1 }),
        });
      }

      await Article.insertMany(articles);

      console.log("Articles generation completed!");
      res.redirect("/articles/list");
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).send("Articles generation not completed!");
    } 
};
