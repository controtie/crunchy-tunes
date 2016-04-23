import React from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';

const UsersContainer = ({ allUsers, currentUser, users, pickUser }) => {
  let cards = users.map(function(user) {
    if (user.fbID && user.fbID !== currentUser.fbID) {
      return <Card onClick={() => pickUser(user)}
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
    }});

    let everyone = allUsers.map(function(user) {
      if (user.fbID && +user.fbID !== +currentUser.fbID) {
        return <Card onClick={() => pickUser(user)}
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
    }});

  return (
    <div className="cardsContainer">
      <div className="col-md-8">
        <h2>Users</h2>
        <p>{users.length} users online</p>
        {everyone}
      </div>
    </div>
  );
};

export default UsersContainer;