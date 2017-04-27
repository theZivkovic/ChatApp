(function(){
	
	let validateUsername = (username) => {
		return username.length > 0;
	}

	$('#joinButton').click(() => {
		let username = $('#username').val();
		if (validateUsername(username)) {
			socket.emit('login', { username: username });
			window.location = "/chat";
		}
	});
}());