import React from 'react';

const Login = (props) => {

  return(
    <div className="container">
      <nav className="nav">
        <p className="nav__title">Pokodex</p>
      </nav>

      <div className="login">
        <button className="login__btn">Login with Facebook</button>
      </div>

    </div>
  );
}

export default Login;
