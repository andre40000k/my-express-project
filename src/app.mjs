import express from "express";
import router from "./routes/index.mjs";
import { errors } from "celebrate";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import pug from "pug";
import cookieParser from "cookie-parser";
import { themeMiddleware } from "./middleware/theme.mjs";
import favicon from 'serve-favicon';
import passport from "passport";
import "./strategies/local.mjs"; 
import session from "express-session";
import mongoose from "mongoose";

import MongoStore from "connect-mongo";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect("mongodb://localhost:27017/testDb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.static(path.join(__dirname, "./public")));
app.use(favicon(path.join(__dirname, "./public/favicon.ico")));

app.engine("pug", (filePath, data, cb) => {
  try {
    const compiled = pug.compileFile(filePath);
    cb(null, compiled(data));
  } catch (err) {
    cb(err);
  }
});

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/testDb" }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.engine("ejs", ejs.renderFile);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(themeMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// http://localhost:3000/users – список пользователей
// http://localhost:3000/users/1 – детали пользователя
// http://localhost:3000/articles – список статей
// http://localhost:3000/articles/1 – детали статьи