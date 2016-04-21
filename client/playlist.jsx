import React from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';

const Playlist = ({ playlist, handleClick }) => {
  let cards = playlist.map((track) =>
    <Card onClick={() => handleClick(track)}
      key={track.contentId}
      className={ClassNames(style['card'])}
      style={{ width: '350px', height: '100px', margin: '15px' }}
    >
      <CardTitle
            avatar="https://c1.staticflickr.com/9/8082/8292777643_65090144e9.jpg"
            title={track.creator}
            subtitle={track.songTitle}
      />

    </Card>
  );
  return (
    <div className="playlist">
      {cards}
    </div>
  );
};

export default Playlist;