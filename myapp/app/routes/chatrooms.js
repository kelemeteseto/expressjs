var express = require('express');
var router = express.Router();

var chatroom = require('../lib/chatroom.js');

module.exports = router;

router.use(function(req, res, next) {
  console.log("Chatroom router");
  next();
});

router.route('/:chatroom')
  .get(function (req, res) {

    var chatroomName = req.params.chatroom;

    var messages = chatroom.readChatroom(chatroomName);

    res.json(messages);
  })
  .post(function (req, res) {
    var chatroomName = req.params.chatroom;
    var name = req.body.name;
    var message = req.body.message;

    var chatMessage = {
      name: name,
      message: message
    };

    var messages = chatroom.postMessage(chatMessage, chatroomName);

    res.json(messages);
  });