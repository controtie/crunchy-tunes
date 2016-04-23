import React from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';

const Playlist = ({ playlist, currentSongIndex, handleClick, remove }) => {
  let cards = playlist.map((track, index) =>
    <Card
      className={ClassNames(style['card'])}
      className={currentSongIndex === index ? ClassNames(style['current-card']) : null}
      key={track.contentId}
      style={{ width: '350px', height: '200px', margin: '15px' }}
    >
      <CardTitle
            className={ClassNames(style['source-logo-for-playlist'])}
            avatar="https://c1.staticflickr.com/9/8082/8292777643_65090144e9.jpg"
            title={track.creator}
            subtitle={track.songTitle}
      />
      <CardActions>
        <Button label="Remove" className={ClassNames(style['remove'])} onClick={() => remove(index)} />
        <Button label="Play"  className={ClassNames(style['play'])} onClick={() => handleClick(track, index, true)} />
      </CardActions>
    </Card>
  );
  return (
    <div className="playlist">
      {cards}
    </div>
  );
};

export default Playlist;