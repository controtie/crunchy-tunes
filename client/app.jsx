import React from 'react';
import LandingPage from './landingPage.jsx'
import SongPlayer from './songplayer.jsx';
import CardsContainer from './cardsContainer.jsx';
import UsersContainer from './UsersContainer.jsx';
import Playlist from './playlist.jsx';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Facebook from './facebook.jsx';
import _ from 'underscore';
import Button from 'react-toolbox/lib/button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: {url: ''},
      playlist: [],
      playIndex: null,
      loggedIn: false,
      user: {avatar: './assets/default_user-884fcb1a70325256218e78500533affb.jpg'},
      listeningTo: null,
      users: [],
      autoplay: false,
      page: 'users',
      allUsers: []
    };

    socket.on('users', function(users) {
      console.log('new users - ', users);
      this.setState({users: users})
    }.bind(this));
    
    socket.on('playlist', function(playlist) {
      this.setState({
        playlist: playlist,
        playIndex: 0,
        currentTrack: playlist[0]
      });
    }.bind(this));

    socket.on('allUsers', function(allUsers) {
      this.setState({allUsers: allUsers});
    }.bind(this));
  }

  nextSong () {
    var newIndex = this.state.playIndex + 1;
    this.playNewSong(this.state.playlist[newIndex], newIndex, true);
  }

  addToPlaylist(track) {
    var playlist = this.state.playlist.slice();
    playlist.push(track);
    this.setState({
      playlist: playlist
    });
    if (this.state.listeningTo === null) {
      socket.emit('playlist', playlist);
    }
    if (playlist.length === 1) {
      this.playNewSong(playlist[0], 0, false);
    }
  }

  removeFromPlaylist(songIndex) {
    var newList = this.state.playlist.slice();
    newList.splice(songIndex, 1);
    this.setState({ playlist: newList });
    if (this.state.listeningTo === null) {
      socket.emit('playlist', newList);
    }
  }

  pickUser(user) {
    if (user.fbID === this.state.user.fbID) {
      user = null;
    }
    this.setState({ listeningTo: user });
    socket.emit('playlistLookup', user);
  }

  pageChange() {
    if (this.state.page === 'tracks') {
      this.setState({page: 'users'});
    } else {
      this.setState({page: 'tracks'});
      socket.emit('playlistLookup', this.state.user);
      this.setState({listeningTo: null})
    }
  }

  login(user) {
    this.setState({loggedIn: true, user: user});
    socket.emit('login', user);
    socket.emit('playlistLookup', user);
  }

  playNewSong(track, index, autoplay) {
    var thing = this;
    SC.stream('/tracks/' + track.id )
    .then(function(player){
      songLink = $.get(player.options.streamUrlsEndpoint, function(song) {
        track.url = song.http_mp3_128_url;
        thing.setState({
          currentTrack: track,
          playIndex: index,
          autoplay: autoplay
        });
      })
      .fail(function(error) {
        console.log( "audio player error - ", error );
      });
    });
  }

  render() {
    var pageLayout;
    if (this.state.loggedIn === false) {
      console.log('not logged in');
      return (
        <div className='login'>
          <LandingPage login={this.login.bind(this)} />
        </div> 
      );
    }
    if (this.state.page === 'tracks' && this.state.loggedIn === true) {
      pageLayout = <div>
        <CardsContainer tracks = {this.state.tracks} handleCardPlay={this.addToPlaylist.bind(this)} />
      </div>
    } else {
      pageLayout = <div>
        <nav className="navBar"></nav>
        <UsersContainer allUsers={this.state.allUsers} currentUser={this.state.user} users={this.state.users} pickUser={this.pickUser.bind(this)} />
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
            <SongPlayer autoplay={this.state.autoplay} track={this.state.currentTrack} songEnd={this.nextSong.bind(this)} />
            <Facebook login={this.login.bind(this)}/>
            <Button label={this.state.page} style={{color: 'white', margin: '0 200px 0 0'}} onClick={this.pageChange.bind(this)} />
            <img src={this.state.user.avatar} height="89" width="89"></img> 
          </AppBar>
          <div className="col-md-8">
          {pageLayout}
          </div>
          <div className="col-md-4">
            <Playlist playlist={this.state.playlist} currentSongIndex={this.state.playIndex} handleClick={this.playNewSong.bind(this)} remove={this.removeFromPlaylist.bind(this)} />
          </div>
      </div>
    );
  }
}

export default App;
