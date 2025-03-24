import passport from "passport";
import { setupLocalStrategy } from "./strategies/local.mjs";
import { setupGoogleStrategy } from "./strategies/google.mjs";
import { User } from "../models/user.mjs";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(setupLocalStrategy());
passport.use(setupGoogleStrategy());
