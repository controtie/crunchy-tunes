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

var users = [];

io.on('connection', function(socket){
  console.log('a user connected', socket.conn.server);

  socket.on('login', function(user) {
    console.log('user logged in -- ', user);
    users.push(user);
    io.emit('users', users)
  })

  socket.on('disconnect', function(user){
    console.log('user disconnected --- ', user);
  });
});

var server = http.listen(port, function(){
  console.log('listening on *:3000');
});
