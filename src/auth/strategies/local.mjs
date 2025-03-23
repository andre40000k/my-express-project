import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../../models/user.mjs";

export const setupLocalStrategy = () => {
  return new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      const isValidPassword = user.password == password ? true : false;
      if (!isValidPassword) return done(null, false, { message: "Wrong password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};