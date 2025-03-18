import express from "express";
import {loginHandler} from "../auth/loginHandler.mjs";
import {registerHandler} from "../auth/registerHandler.mjs";
const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;
