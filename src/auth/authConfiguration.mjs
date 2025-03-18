
const JWT_SECRET = "your_jwt_secret_key";
const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000, // 1 день
  secure: process.env.NODE_ENV === "production",
};

export default {JWT_SECRET, COOKIE_OPTIONS};