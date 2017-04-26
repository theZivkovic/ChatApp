"use strict";

let dateFormat = require('dateformat');

class Message {

	constructor(username, text) {
		this.username = username;
		this.text = text;
		this.date = Date.now();
	}

	setID(newID) {
		this.messageID = newID;
	}

	pretty() {
		const prettyDate = dateFormat(this.date, "mmmm dS yyyy, h:MM:ss TT");
		return `<b>${this.username} on ${prettyDate} wrote:</b> ${this.text}`;
	}
}

module.exports = Message;