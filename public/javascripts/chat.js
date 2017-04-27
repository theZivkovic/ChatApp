'use strict';

(function(){

	$(document).ready(() => {
		
		let userColorFromServer = $("#colorSourceElement").val();

		$("#changeColorButton").colorPicker({
			renderCallback: ($elm, toggled) => {
				let currentColor = $elm.text;
				if (currentColor != '')
					socket.emit('color-changed', currentColor);
			}
		});

		$("#changeColorButton").val(userColorFromServer);
		$("#changeColorButton").css('background-color', userColorFromServer);

		let resetListeners = () => {
			$("#logoutButton").unbind('click');
			$("#logoutButton").click(() => {
				socket.emit("logout");
				window.location = "/login";
			});

			$("#sendMessageButton").unbind('click');
			$("#sendMessageButton").click(() => {
				let messageText = $("#message").val();
				socket.emit("chat-message", messageText);
				$("#message").val("");
			});

			$('input[name^="delete-"').unbind('click');
			$('input[name^="delete-"]').click((event) => {
				let messageID = event.target.name.split('-')[1];
				socket.emit("delete-message", messageID);
			});
		}

		resetListeners();		
		
		socket.on('broadcasted-message', (fullMessage) => {
			$("#messageList").append(`<li>${fullMessage}</li>`);
			resetListeners();
		});

		socket.on('broadcasted-delete-message', (messageID) => {
			let liToDelete = $($(`#messageList input[name='delete-${messageID}`)[0]).parent()[0];
			liToDelete.remove();
		});
	});
}());