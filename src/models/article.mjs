import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const articleSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: String,
  content: String,
});

export const Article = mongoose.model("Article", articleSchema);