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
		  	UserManager.addUser(client.id, username);
		  	UserManager.printUsers();
		  });

		  client.on("user-left", function() {
		  	UserManager.removeUser(client.id);
		  	UserManager.printUsers();
		  });

		  client.on("chat-message", function(data){
		  	UserManager.printUsers();
		  	let currentUser = UserManager.getUserBySessionID(client.id);
		    let messageObj = new Message(currentUser.username, data.messageText, data.messageColor);
		    io.emit("message-added", messageObj.pretty());
		    MessagesManager.addMessage(messageObj);
		  });
		});
	}
}

module.exports = IoHandler;
