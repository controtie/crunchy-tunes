import React from 'react';
import Button from 'react-toolbox/lib/button';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  reloadPlayer() { 
    var audio = document.getElementById('player');
    audio.load();
    if(this.props.autoplay){
      audio.play();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.track.url === this.props.track.url && nextProps.autoplay === this.props.autoplay) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.reloadPlayer()
  }

  render() {

    var updateTitle = this.props.track.songTitle;
    if(this.props.track.songTitle === undefined) {
      updateTitle = '';
    } else {  
      if(this.props.track.songTitle.length > 40) {
        updateTitle = this.props.track.songTitle.substring(0,39) + "...";
      }
    }

    return (
      <div className="songPlayer">
        <h5>{updateTitle}</h5>
        <audio id='player' controls="controls" width="500" height="80" scrolling="no" frameBorder="no" onEnded={this.props.songEnd}>
          <source id="currentsong" src={this.props.track.url} type="audio/wav"></source>
        </audio>
      </div>
    );
  }
};

export default SongPlayer;
