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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var server = http.listen(port, function(){
  console.log('listening on *:3000');
});
