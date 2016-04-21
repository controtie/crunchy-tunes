import React from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';

const UsersContainer = ({ users, pickUser }) => {
  let cards = users.map((user) =>
    <Card onClick={() => pickUser(user)}
      key={user.fbID}
      className={ClassNames(style['card'])}
      style={{ width: '200px', height: '250px', margin: '15px' }}
    >
      <div className={ClassNames(style['image-container'])}>
        <CardMedia
          aspectRatio="square"
          image={user.avatar}
        />
      </div>
      <div className={ClassNames(style['card-title'])}>
      {user.name}
      </div>
      <div className={ClassNames(style['card-overlay'])}>
      </div>
    </Card>
  );
  return (
    <div className="cardsContainer">
      {cards}
    </div>
  );
};

export default UsersContainer;