var Users = require('./UserController.js');

Users.getUser({fbID: 222}, function (user) {
  console.log(user);
});

Users.postUser({fbID: 222, name: 'dylan', avatar: 'avatar here'}, function (state) {
  console.log(state);
});