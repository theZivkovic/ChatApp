'use strict';

let Message = require("./Message");

let messages = [];

let addMessage = (messageObj) => {
	messages.push(messageObj);
}

let removeMessage = (messageID) => {
	messages = messages.filter((messageObj) => {
		return messageObj.messageID != messageID;
	});
}

let getAllMessagesPretty = () => {
	return messages.map((message) => {
		return message.prettify();
	});
}

module.exports.addMessage = addMessage;
module.exports.removeMessage = removeMessage;
module.exports.getAllMessagesPretty = getAllMessagesPretty;

