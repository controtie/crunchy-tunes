var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
//spawn a child process
var spawn = require('child_process').spawn;

exports.getPlaylist = function (playlist, callback) {
  var process = spawn('python', ['./database/PlaylistController.py', 'GET', +playlist.ID]);
  var fetchedPlaylist = null;
  process.stdout.on('data', function (data) {
    if (data) {
      var splitData = decoder.write(data).split('\n');
      var playlistData = [];
      for (var i = 0; i < splitData.length; i++) {
        if (splitData[i] !== '')
        playlistData.push(splitData[i]);
      }
      fetchedPlaylist = playlistData;
    }
  });
  
  process.on('close', function(data) {
    callback(null, fetchedPlaylist);
  })
}

exports.getSong = function (song, callback) {

  var process = spawn('python', ['./database/SongController.py', 'GET', song.name]);
  var success = false;
  process.stdout.on('data', function (data) {
    console.log(decoder.write(data));
  });

  process.stderr.on('data', function (data) {
    console.log(decoder.write(data));
  })

  process.on('close', function () {
    console.log('exiting');
  });
}

exports.postSong = function (song, callback) {
  var stringifiedSong = JSON.stringify(song);

  var process = spawn('python', ['./database/SongController.py', 'POST', stringifiedSong]);
  var success = false;
  process.stdout.on('data', function (data) {
    console.log(decoder.write(data));
  });

  process.stderr.on('data', function (data) {
    console.log(decoder.write(data));
  })

  process.on('close', function () {
    console.log('exiting');
  });
}

exports.postPlaylist = function (playlist, callback) {
  //expecting playlist to look like: 
  //{
  //  userID: 1241,
  //  songs: [
  //    {contentID: 777, songTitle: 'first songTitle here'}, 
  //    {contentID: 888, songTitle: 'second songTitle here'}, 
  //    {contentID: 999, songTitle: 'laste songTitle here'}
  //  ]
  //};

  //post all songs to Songs table
  var success = false;
  var stringifiedSongs = JSON.stringify(playlist.songs);
  var postSongsWorker = spawn('python', ['./database/SongController.py', 'POST', stringifiedSongs]);
  
  postSongsWorker.stdout.on('data', function (data) {
    success = true;
    console.log(decoder.write(data));
  });

  postSongsWorker.stderr.on('data', function (data) {
    console.log(decoder.write(data));
  });

  postSongsWorker.on('close', function (data) {
    //right now success is undefined. this is a bug.
    if (success === false) {
      callback('error on PlaylistController.js: 85', null)
    } else {
      //format Playlist
      console.log('adding to Playlist!');
      var contentIDs = [];
      for (var i = 0; i < playlist.songs.length; i++) {
        contentIDs.push(playlist.songs[i].contentID);
      }
      contentIDs = JSON.stringify(contentIDs);

      //post Playlist to database
      var postPlaylistWorker = spawn('python', ['./database/PlaylistController.py', 'POST', playlist.userID, contentIDs]);
      var success = false;

      postPlaylistWorker.stdout.on('data', function (data) {
        success = true;
        console.log(decoder.write(data));
      });

      postPlaylistWorker.stderr.on('data', function (data) {
        console.log(decoder.write(data));
      });

      postPlaylistWorker.on('close', function (data) {
        if (!success) {
          callback('error on posting Playlist! PlaylistController.js 108', null);
        } else {
          callback(null, 'playlist posted!');
        }
      });

    }
  });
}

// exports.deletePlaylist = function (user, callback) {
//   var process = spawn('python', ['./database/UserController.py', 'POST', +user.fbID, user.name, user.avatar]);
//   var success = false;
//   process.stdout.on('data', function (data) {
//     if (data) {
//       success = true;
//     }
//   });

//   process.on('close', function(data) {
//     if (success) {
//       callback(null, success);
//     } else {
//       callback('postUser failed at UserController.js: 30', success);
//     }
//   })
// }
