(function(){
	
	let validateUsername = () => {
		let username = $('#username').val();
		return username.length > 0;
	}

	$('#joinButton').click(() => {
		let username = $('#username').val();
		if (validateUsername()) {
			socket.emit('login', { username: username });
			window.location = "/chat";
		}
	});

	$(document).on('input', '#username', () => {
		let username = $('#username').val();
		$("#joinButton").prop('disabled', !validateUsername());
	});

	$("#joinButton").prop('disabled', !validateUsername());
	
}());