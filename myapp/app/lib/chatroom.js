module.exports = {
  setDirectory: setDirectory,
  getDirectory: getDirectory,
  createRoom: createRoom,
  readChatroom: readChatroom,
  postMessage: postMessage,
  getUserMessages: getUserMessages
};

var fs = require('fs');
var path = require('path');

var _chatDirectory = null;

function setDirectory ( directoryPath ) {
  var directory = null;
  var dirPath = path.resolve(directoryPath);

  try {
    directory = fs.statSync( dirPath );
  } catch (err) {
    fs.mkdirSync( dirPath );
    directory = fs.statSync( dirPath );
  }

  var isDirectory = directory.isDirectory();

  if (isDirectory) {
    _chatDirectory = directoryPath;
  }

  return isDirectory;
}

function getDirectory () {
  return _chatDirectory;
}

function createRoom ( roomName ) {
  var messages = [];
  var filepath = path.resolve(_chatDirectory, roomName + '.json');

  fs.writeFileSync( filepath, JSON.stringify( messages ));

  return messages;
}

function readChatroom ( roomName, userName ) {
  var filepath = path.resolve(_chatDirectory, roomName + '.json');
  var fileString = null;

  try {
    fileString = fs.readFileSync( filepath ).toString();
  } catch (err) {
      return createRoom( roomName );
  }

  if (userName === undefined) {
    return JSON.parse( fileString );
  } else {
    return JSON.parse( fileString ).filter(function(messages) {

      if(messages.name === userName) {
        return true;
      }
    });
  }
}

function postMessage ( message, roomName ) {
  var messages = readChatroom( roomName );
  var timestamp = new Date();

  var newMessage = {
    name: message.name,
    message: message.message,
    id: messages.length + 1,
    timestamp: timestamp.toString()
  };

  messages.push(newMessage);

  var filepath = path.resolve(_chatDirectory, roomName + '.json');

  fs.writeFileSync( filepath, JSON.stringify( messages ) );

  return messages;
}

function getUserMessages (userName) {
  var files = fs.readdirSync(_chatDirectory);
  var userMessagesArr = [];

  for (var i = 0; i < files.length; i++) {
    var chatroomName = files[i].slice( 0, files[i].lastIndexOf('.') );
    var userMessages = readChatroom(chatroomName, userName);

    userMessagesArr = userMessagesArr.concat(userMessages);
  }
  return userMessagesArr;

}