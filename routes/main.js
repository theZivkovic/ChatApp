"use strict";

let express = require("express");
let router = express.Router();
let MessagesManager = require("../modules/messagesManager");
let UserManager = require("../modules/userManager");

router.get("/chat", function(req, res, next) {
  res.render('chat');
});

router.get("/chat/messages", function(request, response, next){
	response.json(MessagesManager.getAllMessages());
});

router.get("/chat/messages-pretty", function(request, response, next){
	response.json(MessagesManager.getAllMessagesPretty());
});

router.get("/chat/user/:username", function(request, response, next){
	let currentUser = UserManager.getUserByUsername(request.params.username);
	response.json(currentUser);
});

module.exports = router;
