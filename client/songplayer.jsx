import React from 'react';
import Button from 'react-toolbox/lib/button';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  reloadPlayer() { 
    var audio = document.getElementById('player');
    audio.load();
    audio.play();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.track === this.props.track) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.reloadPlayer()
    console.log('loaded');
  }


  render() {
    return (
      <div className="songPlayer">
        <audio id='player' controls="controls" width="500" height="80" scrolling="no" frameBorder="no" onEnded={this.props.songEnd}>
          <source id="currentsong" src={this.props.track} type="audio/wav"></source>
        </audio>
      </div>
    );
  }
};

export default SongPlayer;
