import React, { Component } from 'react';
import {connect} from 'react-redux';

import { loginRequest, loginError } from '../../redux/action';

import { FACEBOOK_APP_ID } from '../../config/config';

import Nav from '../Nav';
import Loader from '../Loader';

class Login extends Component {

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId            : FACEBOOK_APP_ID,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.12'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  handeClick = () => {
    FB.login(response => {
      if(response.status === 'connected') {
        const { accessToken } = response.authResponse;
        this.props.loginRequest(accessToken);
      }else {
        this.props.loginError({name: 'Not logged in', message: 'User not signed in'});
      }
    }, {scope: 'public_profile,email'});
  }

  render() {
    const { login } = this.props;
    const { errors, requesting } = login;
    return(
      <div className="container">
        <Nav />
        { requesting &&
          <Loader isLoading={requesting} />
        }
        <div className="login">
          <button onClick={this.handeClick} className="login__btn">Login by Facebook</button>
          { errors && <span className="login__error">{errors.name} - {errors.message}</span> }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, {loginRequest, loginError})(Login);
