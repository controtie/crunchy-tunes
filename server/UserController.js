var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
//spawn a child process
var spawn = require('child_process').spawn;

exports.getAllUsers = function (callback) {
  var process = spawn('python', ['./database/UserController.py', 'GET']);
  var fetchedUsers = null;

  var formattedUserData = [];
  process.stdout.on('data', function (data) {
    if (data) {
      var splitData = decoder.write(data).split('\n');
      var userData = [];
      for (var i = 0; i < splitData.length; i++) {
        if (splitData[i] < 100 && splitData[i] !== '') {
          userData.push([])
        }
        userData[userData.length-1].push(splitData[i]);
      }
      for (var i = 0; i < userData.length; i++) {
        var user = {
          ID: userData[i][0],
          fbID: userData[i][1],
          avatar: userData[i][2],
          online: userData[i][3],
          name: userData[i][4]
        }
        formattedUserData.push(user);
      }
    }
  });

  process.stderr.on('data', function (data) {
    console.log(decoder.write(data));
  });
  
  process.on('close', function(data) {
    callback(formattedUserData);
  })
}

exports.postUser = function (user, callback) {
  var process = spawn('python', ['./database/UserController.py', 'POST', +user.fbID, user.name, user.avatar]);
  var success = false;
  process.stdout.on('data', function (data) {
    if (data) {
      success = true;
    }
    console.log(decoder.write(data));
  });

  process.stderr.on('data', function (data) {
    console.log('error @ ./database/UserController.py');
    console.log('called @ ./UserController.js: 55');
    console.log(decoder.write(data));
  });

  process.on('close', function(data) {
    if (success) {
      callback(null, 'user post success!');
    } else {
      callback('postUser failed at UserController.js: 43', success);
    }
  });
}

exports.putUser = function (user, callback) {
  var process = spawn('python', ['./database/UserController.py', 'PUT', +user.online, +user.fbID]);
  var success = false;
  process.stdout.on('data', function (data) {
    if (data) {
      success = true;
    }
    console.log(decoder.write(data));
  });

  process.stderr.on('data', function (data) {
    console.log('error @ ./database/UserController.py');
    console.log('called @ ./UserController.js: 79');
    console.log(decoder.write(data));
  });

  process.on('close', function(data) {
    if (success) {
      callback(null, 'user put success!');
    } else {
      callback('putUser failed at UserController.js: 43', success);
    }
  });
}

