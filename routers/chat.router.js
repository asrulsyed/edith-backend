var passport = require("passport"),
    requireAuth = passport.authenticate("jwt", { session: false }),
    router = require("express").Router(),
    chatCtr = require("../controllers/chat.controller");

router.post("/generate", chatCtr.generate);
 
module.exports = router;