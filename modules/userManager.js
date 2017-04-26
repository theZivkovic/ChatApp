"use strict";

let User = require("./user");

let sessionToUsersTable = {};

let addUser = (sessionID, username) => {
	sessionToUsersTable[sessionID] = new User(username);	
}

let removeUser = (sessionID) => {
	delete sessionToUsersTable[sessionID];
}

let printUsers = () => {
	console.log(sessionToUsersTable);
}

let getUserBySessionID = (sessionID) => {
	return sessionToUsersTable[sessionID];
}

module.exports.addUser = addUser;
module.exports.removeUser = removeUser;
module.exports.printUsers = printUsers;
module.exports.getUserBySessionID = getUserBySessionID;
