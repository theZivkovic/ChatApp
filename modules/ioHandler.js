"use strict"

let MessagesManager = require("./messagesManager");
let Message = require("./message");
let UserManager = require("./UserManager");

class IoHandler {

	constructor(server){
		this.server = server;
		this.init();
	}

	init() {

		let io = require('socket.io')(this.server);

		io.on("connection", function(client){

		  console.log("a user connected: " + client.id );

		  client.on("user-joined", function(username) {
		  	if (UserManager.getUserByUsername(username) == null){
	  			UserManager.addUser(client.id, username);
	  			UserManager.printUsers();
		  	}
		  	else
		  	{
		  		UserManager.changeUserSessionID(username, client.id);
		  	}
		  });

		  client.on("user-color-changed", function(newColor){
		  	let currentUser = UserManager.getUserBySessionID(client.id);
		  	currentUser.changeColor(newColor);
		  	UserManager.printUsers();
		  });

		  client.on("chat-message", function(data){
		  	let currentUser = UserManager.getUserBySessionID(client.id);
		    let messageObj = new Message(currentUser.getUsername(), data.messageText, data.messageColor);
		    MessagesManager.addMessage(messageObj);
		    io.emit("message-added", messageObj.pretty());
		  });
		});
	}
}

module.exports = IoHandler;
