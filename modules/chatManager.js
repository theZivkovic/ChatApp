"use strict";

let Message = require("./message");

let messages = [];
let nextMessageID = 0;
	
let addMessage = (messageObj) => {
	if (!messageObj instanceof Message)
		throw `Error in addMessage: ${messageObj} not type of Message`;
	messageObj.setID(nextMessageID);
	messages.push(messageObj);		
	nextMessageID++;
}

let removeMessage = (messageID) => {
	// TO-DO
}

let getAllMessages = () => {
	return messages;
}

module.exports.addMessage = addMessage;
module.exports.removeMessage = removeMessage;
module.exports.getAllMessages = getAllMessages;
