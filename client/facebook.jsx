import React from 'react';
import Button from 'react-toolbox/lib/button';


class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      loggedin: this.props.isLoggedIn,
    };
  }

  componentDidMount() {
    window.fbAsyncInit = function facebookSDK() {
      FB.init({
        appId: '1739990089549797',
        cookie: true,  // enable cookies to allow the server to access
                          // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.6', // use version 2.1
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      // FB.getLoginStatus(function (response) {
      //   this.statusChangeCallback(response);
      // }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  fetchUserInfo() {
    FB.api('/me', {fields: 'id,name,email,picture'}, function(response) {
      var user = {
        name: response.name,
        fbID: response.id,
        avatar: '//graph.facebook.com/' + response.id + '/picture?type=large'
      }
      this.props.login(user);
    }.bind(this));
    this.setState({ loggedin: true });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      this.fetchUserInfo();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
    }
  }

  // This function is called when someone finishes with the Login Button.
  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleLogin() {
    FB.login((response) => {
      FB.getLoginStatus(() => {
        this.statusChangeCallback(response);
      });
    }, {
      scope: 'public_profile, email',
    });
  }

  handleLogout() {
    FB.logout((response) => {
      this.setState({ loggedin: false });
    });
  }


  render() {
    if (this.state.loggedin) {
      return (
        <div><Button label="Log Out" style={{color: 'white' }} onClick={this.handleLogout} /></div>
      );
    } else {
      return (
        <div><Button label="Log In" style={{color: 'white' }} onClick={this.handleLogin} /></div>
      );
    }
  }
}


export default Facebook;
