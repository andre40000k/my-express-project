import passport from "passport";

export const loginHandler = passport.authenticate("local", {
  successRedirect: "/users",
  failureRedirect: "/"
});