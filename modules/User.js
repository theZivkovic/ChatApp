'use strict';

class User {

	constructor(username, color, onLogoutCallback) {
		this._username = username;
		this._color = color;
		this._active = true;
		this._onLogoutCallback = onLogoutCallback;
		this.resetIdlenessTimer();
		
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

	resetIdlenessTimer(){
		
		if (this._timeoutHandle)
			this.clearIdlenessTimer();

		this._timeoutHandle = setTimeout(() => {
			this._onLogoutCallback(this);
		}, 10000);
	}

	clearIdlenessTimer(){
		clearTimeout(this._timeoutHandle);
	}
}

module.exports = User;
