const passport = require("passport"),
  emailUtil = require("../utils/email"),
  ctrl = require("../../controllers/auth.controller"),
  { default: MagicLoginStrategy } = require("passport-magic-login");

const magicLogin = new MagicLoginStrategy({
  secret: process.env.MAGIC_SECRET,
  callbackUrl: "/auth/magic-link/callback",
  sendMagicLink: emailUtil.sendMagicLink,
  verify: ctrl.verifyMagicLink,
});

module.exports = magicLogin;

module.exports.init = function () {
  passport.use("magic-link", magicLogin);
};
