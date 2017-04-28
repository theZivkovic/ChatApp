(function(){
	
	let validateUsername = () => {
		let username = $('#username').val();
		return username.length > 0;
	}

	$('#joinButton').click(() => {
		let username = $('#username').val();
		if (validateUsername()) {
			socket.emit('login', { username: username });
		}
	});

	$(document).on('input', '#username', () => {
		let username = $('#username').val();
		$("#joinButton").prop('disabled', !validateUsername());
	});

	$("#joinButton").prop('disabled', !validateUsername());
	
	socket.on('redirect', (where) => {
		window.location = where;
	});

	socket.on('login-error', (message) => {
		$("#errorMessage").text(message);
	})
}());