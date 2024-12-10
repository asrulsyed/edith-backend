var express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  routers = require("./routers"),
  passport = require("passport"),
  session = require("express-session"),
  methodOverride = require("method-override");

module.exports = () => {
  var app = express();

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cors());
  app.use(morgan("dev"));
  app.use(methodOverride());
  app.use(passport.initialize());
  // NOTE: renable cause twitter auth requires a session
  app.use(passport.session());

  routers.map((router) => {
    if (router === "auth")
      app.use(`/${router}`, require(`../routers/${router}.router`));
    else app.use(`/api/${router}`, require(`../routers/${router}.router`));
  });

  // app.use(express.static(path.resolve(__dirname, "../views")));
  // app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../views", "index.html")));

  return app;
};
