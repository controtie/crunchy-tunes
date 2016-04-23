import React from 'react';
import Button from 'react-toolbox/lib/button';
import ClassNames from 'classnames';
import Facebook from './facebook.jsx';
import style from './styles/toolbox-theme';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <div className="landing-page">
          <h1> Simon Sings~&#9834; </h1>
          <Facebook login={this.props.login}/>
        </div>
      </div>
    );
  }
};

export default LandingPage;