'use strict';

let Message = require("./Message");

let messages = [];

let addMessage = (messageObj) => {
	messages.push(messageObj);
}

let removeMessage = (messageObj) => {
	// to-do
}

let getAllMessagesPretty = () => {
	return messages.map((message) => {
		return message.prettify();
	});
}

module.exports.addMessage = addMessage;
module.exports.removeMessage = removeMessage;
module.exports.getAllMessagesPretty = getAllMessagesPretty;

