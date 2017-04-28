'use strict';

class User {

	constructor(username, color) {
		this._username = username;
		this._color = color ||  '#000';
		this._active = true;
	}

	get color() {
		return this._color;
	}

	get username() {
		return this._username;
	}

	get active(){
		return this._active;
	}

	set color(value){
		this._color = value;
	}

	set active(value){
		this._active = value;
	}
}

module.exports = User;
