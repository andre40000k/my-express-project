import express from "express";
import {loginHandler} from "../auth/loginHandler.mjs";
import {registerHandler} from "../auth/registerHandler.mjs";
import {logoutHandler} from "../auth/logoutHandler.mjs"

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler)

export default router;