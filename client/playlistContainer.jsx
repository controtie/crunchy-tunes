import Drawer from 'react-toolbox/lib/drawer';
import React from 'react';
import Button from 'react-toolbox/lib/button';
import ClassNames from 'classnames';
import Playlist from './playlist.jsx';

class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      active: false,
    };
  }

  handleToggle(e) {
    console.log(this);
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
          <div ClassName="PlaylistContainer">
            <Button style={{color: 'white', paddingLeft: '45px' }} label='Playlist' onClick={this.handleToggle} />
            <Drawer classname="playlistDrawer" active={this.state.active} onOverlayClick={this.handleToggle}>
              <Playlist playlist = {this.props.playlist} removeCard = {this.props.removeCard} />
            </Drawer>
          </div>
        );
  }
}

export default PlaylistContainer;