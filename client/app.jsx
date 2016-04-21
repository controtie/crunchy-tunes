import React from 'react';
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
      currentTrack: '',
      playlist: [],
      loggedIn: false,
      user: {avatar: './assets/default_user-884fcb1a70325256218e78500533affb.jpg'},
      listeningTo: null,
      users: [],
      page: 'tracks'
    };
    socket.on('users', function(users) {
      console.log('new users - ', users);
      this.setState({users: users})
    }.bind(this));
    SC.initialize({client_id: '74ab5bce668cfc75adb7e4b1853f201b'});
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

  pageChange() {
    if (this.state.page === 'tracks') {
      this.setState({page: 'users'});
    } else {
      this.setState({page: 'tracks'});
    }
  }

  login(user) {
    this.setState({loggedIn: true, user: user});
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
        console.log(song.http_mp3_128_url)
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
      <UsersContainer currentUser={this.state.user} users={this.state.users} pickUser={this.pickUser.bind(this)} />
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
            <img src={this.state.user.avatar} height="100" width="100"></img> 
          </AppBar>
          <div className="col-md-8">
          <Playlist playlist = {this.state.tracks} removeCard={this.handleCardPlay.bind(this)} />
          {pageLayout}
          </div>
          <div className="col-md-4">

          </div>
      </div>
    );
  }
}

export default App;

// <Playlist playlist={this.state.playlist} removeCard={this.removeFromPlaylist.bind(this)} />
