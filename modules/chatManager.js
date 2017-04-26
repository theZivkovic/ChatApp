"use strict";

let chatData = [
  	{username: "Dejan", date: "1-1-1111", text: "dsdasdsadsad"},
  	{username: "Zoran", date: "1-1-1111", text: "sasas"},
];

let nextMessageID = 0;

let addMessage = (username, text) => {
	let currentDate = Date.now();
	chatData.push({
		username: username,
		text: text,
		date: currentDate,
		messageID: nextMessageID
	});
	nextMessageID++;
}

let removeMessage = (messageID) => {
	// TO-DO
}

let getMessages = () => {
	return chatData;
}

module.exports.getMessages = getMessages;
module.exports.addMessage = addMessage;
module.exports.removeMessage = removeMessage; 