import express from "express";
import {loginHandler} from "../auth/loginHandler.mjs";
import {registerHandler} from "../auth/registerHandler.mjs";
import {logoutHandler} from "../auth/logoutHandler.mjs"
<<<<<<< HEAD
import { initGoogleAuth, googleAuthCallback } from "../auth/googleAuthHandler.mjs";
=======
>>>>>>> 04f05a8d3463610105fab753d9daa5c5b3676928

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler)

router.get("/google", initGoogleAuth);
router.get("/google/callback", googleAuthCallback);

router.get("/logout", logoutHandler)

export default router;