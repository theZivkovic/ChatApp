'use strict';

class User {

	constructor(username, color) {
		this._username = username;
		this._color = color ||  '#000';
	}

	get color() {
		return this._color;
	}

	get username() {
		return this._username;
	}

	set color(value){
		this._color = value;
	}
}

module.exports = User;
