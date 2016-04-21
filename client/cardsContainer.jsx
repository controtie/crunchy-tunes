import React from 'react';
import Button from 'react-toolbox/lib/button';
import Nav from './nav.js';
import queryAll from './queryAll.js';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      tracks: []
    }
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

  render() {
    return (
      <div className="cardsContainer">
        <Nav handleSearch = { this.handleSearch.bind(this) } searching={ this.state.searching } />
        {this.state.tracks.map((track) =>
          <Card onClick={() => this.props.handleCardPlay(track)}
            key={track.contentId}
            className={ClassNames(style['card'])}
            style={{ width: '350px', height: '300px', margin: '15px' }}
          >
            <div className={ClassNames(style['image-container'])}>
              <CardTitle
                className={ClassNames(style['source-logo'])}
                avatar= {'https://c1.staticflickr.com/9/8082/8292777643_65090144e9.jpg'}
              />
              <CardMedia
                aspectRatio="wide"
                image={track.imagePath}
              />
            </div>
            <div className={ClassNames(style['card-title'])}>
            {track.songTitle}
            </div>
            <div className={ClassNames(style['card-overlay'])}>
            </div>
          </Card>
        )}
      </div>
    );
  }
};

export default CardsContainer;
