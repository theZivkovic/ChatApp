"use strict";

let express = require('express');
let MessagesManager = require('../modules/MessagesManager');
let UserManager = require('../modules/UserManager');
let router = express.Router();

router.get('/', (request, response, next) => {
	response.redirect('/login');
});

router.get('/login', (request, response, next) => {
	if (request.session && request.session.username)
		response.redirect("/chat");
	else
  		response.render('login.jade', { allUsers: UserManager.getAllUsers() });
});

router.get('/chat', (request, response, next) => {
	if (!request.session || !request.session.username)
		response.redirect("/login");

	response.render('chat.jade', { 
		username: request.session.username,
		messages: MessagesManager.getAllMessagesPrettyForUser(request.session.username),
		userColor: UserManager.getUserColor(request.session.username) 
	});

});

module.exports = router;