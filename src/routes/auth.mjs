import express from "express";
import {loginHandler} from "../auth/loginHandler.mjs";
import {registerHandler} from "../auth/registerHandler.mjs";
import {logoutHandler} from "../auth/logoutHandler.mjs"
import { initGoogleAuth, googleAuthCallback } from "../auth/googleAuthHandler.mjs";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

router.get("/google", initGoogleAuth);
router.get("/google/callback", googleAuthCallback);

router.get("/logout", logoutHandler)

export default router;