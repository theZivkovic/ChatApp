"use strict";

let express = require("express");
let router = express.Router();
let ChatManager = require("../modules/chatManager");

router.get("/", function(req, res, next) {
  console.dir(ChatManager.getAllMessages());
  res.render('chat', { messages: ChatManager.getAllMessages()});
});

module.exports = router;
