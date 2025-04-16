import passport from "passport";
import { setupLocalStrategy } from "./strategies/local.mjs";
import { setupGoogleStrategy } from "./strategies/google.mjs";
import { User } from "../models/user.mjs";
import { setupJWTStrategy } from "./strategies/jwtStr.mjs";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use("local", setupLocalStrategy());
passport.use("google", setupGoogleStrategy());
passport.use("jwt", setupJWTStrategy());
