import passport from "passport";

export const initGoogleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google", {
  successRedirect: "/users",
  failureRedirect: "/",
});

export default { initGoogleAuth, googleAuthCallback };
