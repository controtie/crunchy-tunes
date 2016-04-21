
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
//spawn a child
var spawn = require('child_process').spawn;

exports.getUser = function (user, callback) {
  var process = spawn('python', ['./controllerTest.py', 'GET', user.fbID]);
  process.stdout.on('data', function (data) {
    if (data) {
      var splitData = decoder.write(data).split('\n');
      var userData = {
        id: splitData[0],
        fbID: splitData[1],
        name: splitData[2],
        avatar: splitData[3] 
      }
      callback(null, userData);
    }
    callback('user not found', null);
  });
}

exports.postUser = function (user, callback) {
  var process = spawn('python', ['./UserController.py', 'POST', user.fbID, user.name, user.avatar]);
  process.stdout.on('data', function (data) {
    if (data) {
      callback(null, 'success!');
    }
    callback('postUser failed at UserController.js: 30', null);
  });
}
