var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var http = require('http');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

var server = http.createServer(app).listen(port);
var binaryserver = new BinaryServer({server: server, path: '/binary-endpoint'});

binaryserver.on('connection', function(client) {
  console.log('new client ---- ', client.id);
  client.on('stream', function(stream, meta) {
    console.log('>>>Incoming audio stream');

    // broadcast to all other clients
    for(var id in binaryserver.clients){
      if(binaryserver.clients.hasOwnProperty(id)){
        var otherClient = binaryserver.clients[id];
        if(otherClient != client){
          var send = otherClient.createStream(meta);
          stream.pipe(send);
        }
      }
    }
  });
});