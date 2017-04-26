"use strict";

let dateFormat = require('dateformat');

class Message {

	constructor(username, text, color) {
		this.username = username;
		this.text = text;
		this.date = Date.now();
		this.color = color;
	}

	setID(newID) {
		this.messageID = newID;
	}

	pretty() {
		const prettyDate = dateFormat(this.date, "mmmm dS yyyy, h:MM:ss TT");
		return `<b style="color:${this.color}" id=${this.messageID}>${this.username} on ${prettyDate} wrote:</b> ${this.text}`;
	}
}

module.exports = Message;