import express from "express";
import {themeHandler} from "../controllers/theme.mjs"
const themeRouter  = express.Router();

themeRouter.route("/theme").post(themeHandler);

export default themeRouter;