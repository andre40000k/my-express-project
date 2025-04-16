import passport from "passport";
import jwt from "jsonwebtoken";

export const loginHandler = (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", { session: false }, (err, user, info) => {
    try {
      if (err) throw err;
      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Authentication failed",
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json({
          success: true,
          token,
          user: {
            _id: user._id,
            email: user.email,
          },
        });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  })(req, res, next);
};