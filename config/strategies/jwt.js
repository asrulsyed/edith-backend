const passport = require("passport"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  User = require("mongoose").model("User"),
  config = require("../config");

const jwtOptions = {
  secretOrKey: config.secret,
  // NOTE: used helper to extract token Authorization header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = function () {
  passport.use(
    new JwtStrategy(jwtOptions, function (payload, done) {
      User.findById(payload._id)
        .then((user) => {
          if (user) return done(null, user);
          else return done(null, false);
        })
        .catch((err) => {
          console.log(err);
          return done(err, false);
        });
    }),
  );
};
