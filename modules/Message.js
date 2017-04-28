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

	get username(){
		return this._username;
	}

	get date(){
		return this._date;
	}

	canBeDeleted() {
		return Date.now() - this._date <= 15 * 60 * 1000;
	}

	prettify(shouldDisplayDeleteBtn) {

		let result = '';
		
		if (shouldDisplayDeleteBtn)
			result += `<input type="button" name="delete-${this._messageID}" value="X">`;

		result += `<span style="color: ${this._color}">
					<b>${this._username} on ${this._date} wrote:</b>
					${this._messageText}
				   </span>`;
		return result;
	}

	validate() {
		return true;
	}
}

module.exports = Message;
