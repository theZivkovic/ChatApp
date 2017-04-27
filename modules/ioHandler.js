"use strict";

let MessagesManager = require('./MessagesManager');
let UserManager = require('./UserManager');
let Message = require('./Message');
let User = require('./User');

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
		        let newUser = new User(userData.username);
		        UserManager.addUser(newUser);
		        console.log(`LOGIN: ${socket.handshake.session.username}`);
		    });

		    socket.on('logout', () => {
		        if (socket.handshake.session.username) {
		        	UserManager.removeUser(socket.handshake.session.username);
		            delete socket.handshake.session.username;
		            socket.handshake.session.save();
		        }
		    });

		    socket.on('chat-message', (messageText) => {
		    	if (socket.handshake.session.username){
		    		let currentColor = UserManager.getUserColor(socket.handshake.session.username);
		    		let newMessage = new Message(socket.handshake.session.username, messageText, currentColor);
		    		MessagesManager.addMessage(newMessage);
		    		console.log(MessagesManager.getAllMessagesPretty());
		    		this.io.emit('broadcasted-message', newMessage.prettify());
		    	}
		    });

		    socket.on('color-changed', (newColor) => {
		    	UserManager.setUserColor(socket.handshake.session.username, newColor);
		    	console.log(UserManager.getAllUsers());
		    });

		    socket.on('delete-message', (messageID) => {
		    	MessagesManager.removeMessage(messageID);
		    	this.io.emit('broadcasted-delete-message', messageID);
		    });
		});
	}


}

module.exports = IoHandler;