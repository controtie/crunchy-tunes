import React from 'react';
import Nav from './nav.js';
import SongPlayer from './songplayer.jsx';
import CardsContainer from './cardsContainer.jsx';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import queryAll from './queryAll.js';
import _ from 'underscore';
import Button from 'react-toolbox/lib/button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        {
          artist: 'Yeezy',
          apiSource: 'test',
        },
      ],
      currentTrack: {
        artist: 'Yeezy',
        apiSource: 'test',
      },
      searching: false,
    };
  }

  componentDidMount() {
    const self = this;
    queryAll({ query: 'Kanye',
      })
      .then((results) => {
        self.setState({
          tracks: results,
        });
      });
  }

  handleCardPlay(track) {
    this.setState({
      currentTrack: track,
    });
  }

  handleSearch(value) {
    const self = this;
    if(value === null) {
      this.setState({
        searching: false,
      });
    }
    this.setState({
      searching: true,
    });
    queryAll({ query: value })
      .then((results) => {
        self.setState({
          tracks: results,
          searching: false,
        });
      });
  }

  callFBLogin() {
    FB.login();
  }

  callFBLogout () {
    FB.logout();
  }

  listen() {
    var host = location.origin.replace(/^http/, 'ws') + '/binary-endpoint'
    var client = new BinaryClient(host);
    client.on('stream', function(stream, meta) {
      console.log('streaming...');
    })
  }

  broadcast() {

  }

  render() {
    return (
      <div>
          <AppBar className="appBar" >
            <Navigation type="horizontal" style= { { width: '700px', }} actions={[
              {
                label: 'Crunchy Tunes',
                raised: true,
                accent: true,
                icon: 'audiotrack',
              }]}
            />
            <SongPlayer track = {this.state.currentTrack} />
            <Button label="Log In!" style={{color: 'white', paddingLeft: '45px' }} onClick={this.callFBLogin} /> 
            <Button label="Log Out!" style={{color: 'white' }} onClick={this.callFBLogout} /> 
            <Button label="listen!" style={{color: 'white', paddingLeft: '45px' }} onClick={this.listen} />
            <Button label="broadcast!" style={{color: 'white', paddingLeft: '45px' }} onClick={this.broadcast} /> 
          </AppBar>
          <Nav handleSearch = { this.handleSearch.bind(this) } searching={ this.state.searching } />
          <CardsContainer tracks = {this.state.tracks}
            handleCardPlay = {this.handleCardPlay.bind(this)}
          />
      </div>
    );
  }
}

export default App;
