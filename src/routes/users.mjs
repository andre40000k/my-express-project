import express from "express";

import {
    getUserByIdHandler,
    getUsersHandler
} from "../controllers/users.mjs";

import { authMiddleware } from '../middleware/auth.mjs'; // Правильный путь

const usersRouter = express.Router();

usersRouter.route("/").get(authMiddleware, getUsersHandler);

usersRouter.route("/:userId").get(authMiddleware, getUserByIdHandler);

export default usersRouter;  