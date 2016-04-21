var Songs = require('./PlaylistController.js');

var testPlaylist = {
  userID: 445,
  songs: [
    {contentID: 777, songTitle: 'first songTitle here'}, 
    {contentID: 123, songTitle: 'second songTitle here'}, 
    {contentID: 456, songTitle: 'laste songTitle here'}
  ]
}

// Songs.postSong(testSongs, function (err, state) {
//   console.log(err, state);
// });

Songs.postPlaylist(testPlaylist, function (err, state) {
  console.log(err, state);
});

// Songs.getSong({name: 'first song'}, function (song) {
//   console.log(song);
// } )