import React from 'react';

const SongPlayer = ({ track }) => {
  return (
    <div className="songPlayer">
      <audio id='player' controls="controls" width="500" height="80" scrolling="no" frameBorder="no">
        <source id="currentsong" src={track} type="audio/wav"></source>
      </audio>
    </div>
  );
};

export default SongPlayer;
