var express = require('express');
var router = express.Router();

var chatroom = require('../lib/chatroom.js');

module.exports = router;

var users = [];

router.route('/:username')
  .get(function (req, res) {
    var username = req.params.username;

    if (users.indexOf(username) < 0) {
      users.push(username);
    }

    var index = users.indexOf(username);

    res.json({id: index, username: username});
  });
  // .get(function(req, res) {
  //   res.json({usernames: users});
  // });
  // .get('/users/:username/:chatroomName', function (req, res) {
  //   var username = req.params.name;
  //   var chatroomName = req.params.chatroom;
  //   console.log(chatroomName);

  //   res.json(chatroomName);
  // })
