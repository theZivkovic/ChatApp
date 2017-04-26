"use strict"

let ChatManager = require("./chatManager");
let Message = require("./message");

class IoHandler {

	constructor(server){
		this.server = server;
		this.init();
	}

	init() {

		let io = require('socket.io')(this.server);

		io.on("connection", function(client){

		  console.log("a user connected: " + client.id );

		  client.on("chat-message", function(messageText){
		    let messageObj = new Message("dejan", messageText);
		    io.emit("message-added", messageObj.pretty());
		    ChatManager.addMessage(messageObj);
		  });
		});
	}
}

module.exports = IoHandler;
