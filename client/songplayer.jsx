import React from 'react';

const SongPlayer = ({ track }) => {
  let embed;

  switch (track.apiSource) {
    case 'SoundCloud':
      embed = <iframe width="500" height="80" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${track.contentId}&color=orange_white`}></iframe>;
      break;
    default:
      console.log('uh oh');
  }

  return (
    <div className="songPlayer">
      <div>{embed}</div>
    </div>
  );
};

export default SongPlayer;
