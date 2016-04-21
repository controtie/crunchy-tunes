import React from 'react';
import Nav from './nav.js';
import SongPlayer from './songplayer.jsx';
import CardsContainer from './cardsContainer.jsx';
import UsersContainer from './UsersContainer.jsx';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Facebook from './facebook.jsx';
import queryAll from './queryAll.js';
import _ from 'underscore';
import Button from 'react-toolbox/lib/button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      currentTrack: '',
      playlist: [],
      searching: false,
      loggedIn: false,
      listeningTo: null,
      users: [],
      page: 'tracks',
      playlist: []
    };
    socket.on('users', function(users) {
      console.log('new users - ', users);
      this.setState({users: users})
    }.bind(this));
    SC.initialize({
      client_id: '74ab5bce668cfc75adb7e4b1853f201b'
    });
  }

  componentDidMount() {
    const self = this;
    queryAll({ query: 'Baby Beluga',
      })
      .then((results) => {
        self.setState({
          tracks: results,
        });
      });
  }

  handleCardPlay(track) {
      this.setState({
      currentTrack: track.contentId
    });
    var playlist = this.state.playlist.slice();
    playlist.push(track);
    this.setState({
      playlist: playlist
    });
  }

  pickUser(user) {
    this.setState({
      listeningTo: user
    })
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

  pageChange() {
    if (this.state.page === 'tracks') {
      this.setState({page: 'users'});
    } else {
      this.setState({page: 'tracks'});
    }
  }

  login(user) {
    this.setState({loggedIn: true});
    socket.emit('login', user);
  }

  removeFromPlaylist(songIndex) {
    var newList = this.state.playlist.splice(songIndex, 1);
    this.setState({playlist: newList});
  }

  playNewSong(trackID) {
    var thing = this;
    SC.stream('/tracks/' + trackID.contentId )
    .then(function(player){
      songLink = $.get(player.options.streamUrlsEndpoint, function(song) {

        thing.setState({currentTrack: song.http_mp3_128_url});
      })
      .fail(function(error) {
        console.log( "audio player error - ", error );
      });
    });
  }

  render() {
    var pageLayout;
    if (this.state.page === 'tracks') {
      pageLayout = <div>
      <Nav handleSearch = { this.handleSearch.bind(this) } searching={ this.state.searching } />
      <CardsContainer tracks = {this.state.tracks} handleCardPlay = {this.playNewSong.bind(this)} />
      </div>
    } else {
      pageLayout = <div>
      <nav className="navBar"></nav>
      <UsersContainer users={this.state.users} pickUser={this.pickUser.bind(this)} />
      </div>
    }
    return (
      <div>
          <AppBar className="appBar" >
            <Navigation type="horizontal" style= {{ width: '700px' }} actions={[
              {
                label: 'Crunchy Tunes',
                raised: true,
                accent: true,
                icon: 'audiotrack',
              }]}
            />
            <SongPlayer track = {this.state.currentTrack} />
            <Facebook login={this.login.bind(this)}/>
            <Button label={this.state.page} style={{color: 'white', paddingLeft: '45px' }} onClick={this.pageChange.bind(this)} /> 
          </AppBar>
          {pageLayout}
      </div>
    );
  }
}

export default App;

// <Playlist playlist={this.state.playlist} removeCard={this.removeFromPlaylist.bind(this)} />
