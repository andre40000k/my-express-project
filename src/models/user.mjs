import { string } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String
});

export const User = mongoose.model("User", userSchema);