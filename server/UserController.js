var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
//spawn a child
var spawn = require('child_process').spawn;

exports.getUser = function (user, callback) {
  console.log('-----calling getUser----');
  var process = spawn('python', ['./database/UserController.py', 'GET', +user.fbID]);
  var fetchedUser = null;
  
  process.stdout.on('data', function (data) {
    console.log('beginning');
    console.log('reading data from stdout');
    console.log(decoder.write(data));
    if (data) {
      var splitData = decoder.write(data).split('\n');
      var userData = {
        id: splitData[0],
        fbID: splitData[1],
        name: splitData[2],
        avatar: splitData[3] 
      }
      fetchedUser = userData;
    }
  });
  
  process.on('close', function(data) {
    console.log('exiting');
    callback(null, fetchedUser);
  })
}

exports.postUser = function (user, callback) {
  var process = spawn('python', ['./database/UserController.py', 'POST', +user.fbID, user.name, user.avatar]);
  var success = false;
  process.stdout.on('data', function (data) {
    if (data) {
      console.log('logging data');
      console.log(data);
      success = true;
    }
  });

  process.on('close', function(data) {
    if (success) {
      callback(null, success);
    } else {
      callback('postUser failed at UserController.js: 30', success);
    }
  })

}