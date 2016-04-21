import React from 'react';
import Button from 'react-toolbox/lib/button';

window.reloadPlayer = function (link) { 
  var audio = document.getElementById('player');
  audio.load();
  audio.play();
};

const SongPlayer = ({ track }) => {
  console.log(track);

  return (
    <div className="songPlayer">
      <audio id='player' controls="controls" width="500" height="80" scrolling="no" frameBorder="no">
        <source id="currentsong" src={track} type="audio/wav"></source>
      </audio>
      <div><Button label="reload!" style={{color: 'white', paddingLeft: '45px' }} onClick={window.reloadPlayer} /></div>
      <script>

      var source = document.getElementById('currentsong');
      if(source.src === undefined) {
        setTimeout(function(){window.reloadPlayer()}, 1)
      }

      </script>
    </div>
  );
};

export default SongPlayer;



