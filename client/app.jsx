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
      loggedIn: false,
      listeningTo: null,
      users: [],
      page: 'tracks'
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

  callFBLogin() {
    FB.login();
  }

  callFBLogout () {
    FB.logout();
  }

  pageChange() {
    if (this.state.page === 'tracks') {
      this.setState({page: 'users'});
    } else {
      this.setState({page: 'tracks'});
    }
  }

  render() {
    var pageLayout;
    if (this.state.page === 'tracks') {
      pageLayout = <div>
      <Nav handleSearch = { this.handleSearch.bind(this) } searching={ this.state.searching } />
      <CardsContainer tracks = {this.state.tracks} handleCardPlay = {this.handleCardPlay.bind(this)} />
      </div>
    } else {
      pageLayout = <UsersContainer users = {this.state.users} pickUser = {this.pickUser.bind(this)} />
    }
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
            <Facebook />
            <Button label={this.state.page} style={{color: 'white', paddingLeft: '45px' }} onClick={this.pageChange.bind(this)} /> 
          </AppBar>
          {pageLayout}
      </div>
    );
  }
}

export default App;
