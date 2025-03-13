import express from "express";

import {
    getUserByIdHandler,
    getUsersHandler
} from "../controllers/users.mjs";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsersHandler);

usersRouter.route("/:userId").get(getUserByIdHandler)

export default usersRouter; 