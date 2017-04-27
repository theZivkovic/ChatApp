'use strict';

class Message {

	constructor(username, messageText, color) {
		this.username = username;
		this.messageText = messageText;
		this.date = Date.now();
		this.color = color ||  '#000';
	}

	prettify() {
		return `${this.username} on ${this.date} wrote: ${this.messageText}`;
	}
}

module.exports = Message;
