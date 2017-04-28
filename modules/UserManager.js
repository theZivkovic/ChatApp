'use strict';

let User = require("./User");

let users = [];

let addUser = (userObj) => {
	users.push(userObj);
}

let removeUser = (username) => {
	users = users.filter((user) => {
		user.username != username;
	});
}

let getUser = (username) => {
	return users.find((user) => {
		return user.username ==  username;
	});
}

let setUserColor = (username, newColorHex) => {
	let user = getUser(username);
	if (user)
		user.color =  newColorHex;
}

let getUserColor = (username) => {
	let user = getUser(username);
	if (user)
		return user.color;
	return "#100";
}

let getAllUsers = () => {
	return users;
}

module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.removeUser = removeUser;
module.exports.setUserColor = setUserColor;
module.exports.getUserColor = getUserColor;
module.exports.getAllUsers = getAllUsers;