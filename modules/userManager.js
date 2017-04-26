"use strict";

let User = require("./user");

let sessionToUsersTable = {};

let addUser = (sessionID, username) => {
	sessionToUsersTable[sessionID] = new User(username);	
}

let changeUserSessionID = (username, newSessionID) => {
	let foundSessionID = Object.keys(sessionToUsersTable).find((sessionID) => {
		return sessionToUsersTable[sessionID].getUsername() == username;
	});

	if (foundSessionID)
		delete sessionToUsersTable[foundSessionID];

	addUser(newSessionID, username);
}

let printUsers = () => {
	console.log(sessionToUsersTable);
}

let getUserBySessionID = (sessionID) => {
	return sessionToUsersTable[sessionID];
}

let getUserByUsername = (username) => {
	let foundSessionID = Object.keys(sessionToUsersTable).find((sessionID) => {
		return sessionToUsersTable[sessionID].getUsername() == username;
	});

	if (!foundSessionID)
		return null;

	return sessionToUsersTable[foundSessionID];
}

module.exports.addUser = addUser;
module.exports.printUsers = printUsers;
module.exports.getUserBySessionID = getUserBySessionID;
module.exports.getUserByUsername = getUserByUsername;
module.exports.changeUserSessionID = changeUserSessionID;
