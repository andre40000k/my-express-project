import "dotenv/config";
import express from "express";
import router from "./routes/index.mjs";
import { errors } from "celebrate";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import pug from "pug";
import cookieParser from "cookie-parser";
import { themeMiddleware } from "./middleware/theme.mjs";
import favicon from "serve-favicon";

import "./auth/passport.mjs";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

import passport from "passport";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
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

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
});