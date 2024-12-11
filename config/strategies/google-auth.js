const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  ctrl = require("../../controllers/auth.controller");

module.exports = function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://edith-backend.vercel.app/auth/google/callback",
      },
      ctrl.verifyGoogleLogin,
    ),
  );
};
