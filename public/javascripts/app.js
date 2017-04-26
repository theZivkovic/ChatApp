"use strict";

let socket = io.connect('http://localhost:3000');


function onSendClicked() {

	var id = socket.io.engine.id;
	console.log(id);
	
	let messageText = document.querySelector("#messageInput").value;
	socket.emit("chat-message", messageText);
}

socket.on("message-added", function(message){
	let newMessage = document.createElement("li");
	newMessage.innerHTML = message;
	document.querySelector("#messages").appendChild(newMessage);
});