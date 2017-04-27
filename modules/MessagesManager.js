'use strict';

let Message = require("./Message");

let messages = [];

let addMessage = (messageObj) => {
	messages.push(messageObj);
}

let removeMessage = (username, messageID) => {

	let foundMessage = messages.find((message) => {
		return message.username == username && message.messageID == messageID;
	});

	if (!foundMessage)
		throw `Message #{messageID} doesn't belong to #{username}`;

	if (!foundMessage.canBeDeleted())
		throw `Message #{messageID} is too old to be deleted`;

	messages = messages.filter((messageObj) => {
		return messageObj.messageID != messageID;
	});
}


let getAllMessagesPrettyForUser = (theUsername) => {
	return messages.map((message) => {
		let messageBelongsToTheUser = message.username == theUsername;
		console.log(messageBelongsToTheUser);
		return message.prettify(messageBelongsToTheUser);
	});
}

module.exports.addMessage = addMessage;
module.exports.removeMessage = removeMessage;
module.exports.getAllMessagesPrettyForUser = getAllMessagesPrettyForUser;
