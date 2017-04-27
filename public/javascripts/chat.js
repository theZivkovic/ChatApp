'use strict';

(function(){

	$("#logoutButton").click(() => {
		socket.emit("logout");
		window.location = "/login";
	});

	$("#sendMessageButton").click(() => {
		let messageText = $("#message").val();
		socket.emit("chat-message", messageText);
		$("#message").val("");
	});

	socket.on('broadcasted-message', (fullMessage) => {
		$("#messageList").append(`<li>${fullMessage}</li>`);
	});

}());