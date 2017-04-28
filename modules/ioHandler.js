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
		        
		    	let user = UserManager.getUser(userData.username);

		    	if (user && user.active){
		    		socket.emit('login-error', `${userData.username} already logged in`);
		    		return;
		    	}

		        if (!user) {
		        	user = new User(userData.username);
		        	UserManager.addUser(user);
		        }
		        else 
		        	user.active = true;
		        
		        socket.handshake.session.username = userData.username;
		        socket.handshake.session.save();
		       	socket.emit('redirect', '/chat');

		       	console.log("LOGIN:::", UserManager.getAllUsers());
		    });

		    socket.on('logout', () => {
		        if (socket.handshake.session.username) {
		        	let usernameToLogout = socket.handshake.session.username;
		        	let userToLogout = UserManager.getUser(usernameToLogout);
		        	userToLogout.active = false;

		            delete socket.handshake.session.username;
		            socket.handshake.session.save();

		            console.log("LOGOUT:::", UserManager.getAllUsers());
		        }
		    });

		    socket.on('chat-message', (messageText) => {
		    	if (socket.handshake.session.username) {
		    		let currentUsername = socket.handshake.session.username;
		    		let currentColor = UserManager.getUserColor(currentUsername);
		    		let newMessage = new Message(currentUsername, messageText, currentColor);
		    		if (newMessage.validate()){
		    			MessagesManager.addMessage(newMessage);
		    			socket.broadcast.emit('broadcasted-message', newMessage.prettify(false));
		    			socket.emit('broadcasted-message', newMessage.prettify(true));
		    		}
		    	}
		    });

		    socket.on('color-changed', (newColor) => {
		    	UserManager.setUserColor(socket.handshake.session.username, newColor);
		    	console.log(UserManager.getAllUsers());
		    });

		    socket.on('delete-message', (messageID) => {

		    	try 
		    	{
		    		MessagesManager.removeMessage(socket.handshake.session.username, messageID);
		    		this.io.emit('broadcasted-delete-message', messageID);
		    	}
		    	catch(e)
		    	{
		    		console.log(e);
		    		// to do
		    	}
		    	
		    });
		});
	}


}

module.exports = IoHandler;