
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
//spawn a child
var spawn = require('child_process').spawn;

exports.getUser = function (user, callback) {
  var process = spawn('python', ['./UserController.py', 'GET', user.fbID]);
  process.stdout.on('data', function (data) {
    callback(decoder.write(data));
  });
}

exports.postUser = function (user, callback) {
  var process = spawn('python', ['./UserController.py', 'POST', user.fbID, user.name, user.avatar]);
  process.stdout.on('data', function (data) {
    callback(decoder.write(data));
  });
}
