//server.js
var config = require('./config.json');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var chatroom = require('./app/lib/chatroom.js');
chatroom.setDirectory('./app/data/');

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/chatrooms', require('./app/routes/chatrooms.js'));

app.use('/users', require('./app/routes/users.js'));

// app.get('/hello/:name', function (req, res) {
//   var name = req.params.name.toLowerCase();
//   name = name[0].toUpperCase() + name.slice(1);
//   res.render('index', { name: name });
// });

// app.get('/add/:x/:y', function (req, res) {
//   var x = request.params.x;
//   var y = request.params.y;

//   res.json({ answer: x + y });
// });

var server = app.listen(config.port, displayServerInfo);

function displayServerInfo () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
}