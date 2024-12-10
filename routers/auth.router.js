const config = require("../config/config");

const passport = require("passport"),
  magicLogin = require("../config/strategies/magic-login"),
  router = require("express").Router(),
  ctrl = require("../controllers/auth.controller");

// Magic Link Auth
router.post("/magic-link", magicLogin.send);
router.get(
  "/magic-link/callback",
  passport.authenticate("magic-link", { session: false }),
  ctrl.getTokenAndRedirect,
);

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.client_url}/auth/signin`,
  }),
  ctrl.getTokenAndRedirect,
);

// Twitter Auth
router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: `${config.client_url}/auth/signin`,
  }),
  ctrl.getTokenAndRedirect,
);

/** 
 * Sample Auth Protected Route to 
 * test Bearer Tokens from client app works
*/
router.get("/protected", ctrl.ensureAuthenticated, (req, res) => {
  res.send(req.user);
});

router.post("/verify-code", ctrl.verifyCode);
router.post("/check-code", ctrl.checkCode)

module.exports = router;
