//used to test interactions between .js and .py controllers
var Users = require('./UserController.js');
var Playlists = require('./PlaylistController.js')

// Playlists.getPlaylist({ID: 123}, function (err, playlist) {
//   console.log('playlist = ', playlist);
// })

Playlists.postPlaylist({ID: 1234, URL: 'rocky!'}, function (err, playlist) {
  console.log('playlist posted? ', playlist);
})


// Users.getUser({fbID: 222}, function (err, user) {
//       console.log('this should not be null!');
//       console.log(user);
//     });


// Users.postUser({fbID: 222, name: 'dylan', avatar: 'avatar here'}, function (state) {
//   console.log(state);
// });

// var user = {fbID: 255151551, name: 'dylan', avatar: 'avatar here'};
// var user = { name: 'Dylan Tran',
//   fbID: '222',
//   avatar: 'https://scontent.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c210.17.750.750/s50x50/18935_433834726710224_1618359755_n.jpg?oh=eae6e65cfa0439b9ae5176fc8f04a633&oe=57B13DDC' }

// Users.getUser(user, function (err, fetchedUser) {
//   console.log('fetchedUser = ', fetchedUser);
//   if (fetchedUser === null) {
//     console.log('posting User');
//     Users.postUser(user, function (err, success) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('user added!');
//       }
//     });
//   } else {
//     console.log(fetchedUser);
//   }
// })