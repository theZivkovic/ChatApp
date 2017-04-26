"use strict";

class User {
	
	constructor(username) {
		this.color = "black"
		this.username = username;
	}

	changeColor(newColor) {
		this.color = newColor;
	}

	getUsername() {
		return this.username;
	}
}

module.exports = User;