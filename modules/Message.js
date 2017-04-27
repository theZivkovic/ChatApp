'use strict';

let nextMessageID = 0;

class Message {

	constructor(username, messageText, color) {
		this._username = username;
		this._messageText = messageText;
		this._date = Date.now();
		this._color = color ||  '#000';
		this._messageID = nextMessageID;
		nextMessageID++;
	}

	get messageID(){
		return this._messageID;
	}

	prettify() {
		return `<input type="button" name="delete-${this._messageID}" value="X">
				<span style="color: ${this._color}">
					<b>${this._username} on ${this._date} wrote:</b>
					${this._messageText}
				</span>`;
	}


}

module.exports = Message;
