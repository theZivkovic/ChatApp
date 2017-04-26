"use strict";

let socket = io.connect('http://localhost:3000');

$(document).ready(() => {

	let currentColor = "#000000";

	let validateUsername = (username) => {
		return username.length > 0;
	}

	let createChatBox = () => {
		$.ajax({
			url: "/chat/messages-pretty",
			success: (data) => {

				$("#chatContainer").append('<ul id="messages"></ul>');
				data.forEach((messagePretty) => {
					let messageHTML = `<li>${messagePretty}</li>`;
					$("#chatContainer > ul").append(messageHTML);
				});

				$("#chatContainer").append('<input type="text" id="messageInput" placeholder="message"/>');

				let sendButton = $('<input type="button" value="Send"/>');
				sendButton.click(() => {
					let messageText = $("#messageInput").val();
					socket.emit("chat-message", {
						messageText: messageText,
						messageColor: currentColor
					});
				});

				let leaveButton = $('<input type="button" value="Leave"/>');
				leaveButton.click(() => {
					window.location = "/chat";
				});

				let colorPicker = $('<input type="text" value="Change color"/>');

				colorPicker.colorPicker({
					colorBG: "#000",
					renderCallback: function($elm, toggled){
						currentColor = "#" + this.color.colors.HEX;
						socket.emit("user-color-changed", currentColor);
					}
				});

				$("#chatContainer").append(sendButton);
				$("#chatContainer").append(leaveButton);
				$("#chatContainer").append(colorPicker);
			},
			error: (err) => {
				console.log(err);
			}
		})
	}

	$("#joinButton").click(() => {
		let username = $("#username").val();
		if (validateUsername(username)) {
			socket.emit("user-joined", username);
			$("#loginBox").fadeOut();
			createChatBox();
		}
	});

	$("#username").on("input", () => {
		let username = $("#username").val();
		if (validateUsername(username))
			$("#joinButton").attr("disabled", false);
		else
			$("#joinButton").attr("disabled", true);
	});
});


socket.on("message-added", function(message){
	let newMessage = $(`<li>${message}</li>`);
	$("#messages").append(newMessage);
});
