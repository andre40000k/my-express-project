import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../../models/user.mjs";

export const setupJWTStrategy = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      (req) => req.cookies?.token,
    ]),
    secretOrKey: process.env.JWT_SECRET,
  };

  return new JWTStrategy(options, async (jwtPayload, done) => {
    try {
        console.log("444444444444444444444444");
      console.log("JWT Payload received:", jwtPayload);

      const user = await User.findById(jwtPayload.userId);

      if (!user) {
        console.log("User not found with id:", jwtPayload.userId);
        return done(null, false);
      }

      console.log("User authenticated via JWT:", user.email);
      return done(null, user);
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return done(error, false);
    }
  });
};
