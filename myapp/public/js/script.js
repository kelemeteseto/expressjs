/**
* Chatroom Application
* version 2.0
*/

$(function (){

  var $name = $('#name');
  var $message = $('#messages');
  var $form = $('#form');
  var $messageList = $('#messageList');
  var chatroom = null;

  function messageAdd(data){
    $.each(data, function(i, message){

      $messageList.append('<p>' + 'message: ' + message.message + '</p>');
    });
  } //End of messageAdd function

  $name.on('keypress', function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      chatroom =  $name.val();
    }
  });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/chatrooms/' + chatroom,
    success: function(data) {
      console.log("I have messages!", data);
    }
  }); //End of GET method

  $form.on("submit", function(event) {
    event.preventDefault();
    // debugger;
    chatroom =  $name.val();

    var chatMessage = {
      name: $name.val(),
      message: $message.val()
    }; //End of form.on

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/chatrooms/' + chatroom,
      data: JSON.stringify(chatMessage),
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        messageAdd(data);
      }
    }); //End of POST method

  }); //End of form.on

}); //End of Application