var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
//spawn a child process
var spawn = require('child_process').spawn;

var testSongs = [
{contentID: 777, songTitle: 'first songTitle here'}, 
{contentID: 123, songTitle: 'second songTitle here'}, 
{contentID: 456, songTitle: 'laste songTitle here'}
]
