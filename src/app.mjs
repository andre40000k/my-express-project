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

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



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

app.engine("ejs", ejs.renderFile);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(themeMiddleware);

app.use(router);
app.use(errors());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// http://localhost:3000/users – список пользователей
// http://localhost:3000/users/1 – детали пользователя
// http://localhost:3000/articles – список статей
// http://localhost:3000/articles/1 – детали статьи