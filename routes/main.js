"use strict";

let express = require("express");
let router = express.Router();
let ChatManager = require("../modules/chatManager");

router.get("/", function(req, res, next) {
  res.render('chat', { messages: ChatManager.getMessages()});
});

module.exports = router;
