"use strict";

let MessagesManager = require('./MessagesManager');
let Message = require('./Message');

class IoHandler {

	constructor(io) {
		this.io = io;
		this.init();
	}

	init() {
		this.io.on('connection', (socket) => {
		    
		    socket.on('login', (userData) => {
		        socket.handshake.session.username = userData.username;
		        socket.handshake.session.save();
		        console.log(`LOGIN: ${socket.handshake.session.username}`);
		    });

		    socket.on('logout', () => {
		        if (socket.handshake.session.username) {
		            delete socket.handshake.session.username;
		            socket.handshake.session.save();
		        }
		    });

		    socket.on('chat-message', (messageText) => {
		    	if (socket.handshake.session.username){
		    		let newMessage = new Message(socket.handshake.session.username, messageText);
		    		MessagesManager.addMessage(newMessage);
		    		console.log(MessagesManager.getAllMessagesPretty());
		    		this.io.emit('broadcasted-message', newMessage.prettify());
		    	}
		    });

		});
	}


}

module.exports = IoHandler;