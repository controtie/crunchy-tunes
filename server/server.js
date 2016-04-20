var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

var users = {};

var clientsToArray = function(clients) {
  var results = [];
  for (var key in clients) {
    results.push(users[key]);
  }
  return results;
};

io.on('connection', function(socket){
  console.log('a user connected');
  users[socket.conn.id] = {};

  socket.on('login', function(user) {
    console.log('user logged in - ', user);
    users[socket.conn.id] = user;
    io.emit('users', clientsToArray(socket.conn.server.clients));
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    delete users[socket.conn.id];
  });
});

var server = http.listen(port, function(){
  console.log('listening on *:3000');
});
