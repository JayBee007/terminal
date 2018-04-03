import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { unauthenticated } from '../../redux/action';

const Nav = (props) => {
  const { auth } = props;

  const handeLogout = () => {
    props.unauthenticated();
  }

  if(auth) {
    return (
      <nav className="nav">
          <p className="nav__title">Pokodex</p>
          <ul className="nav__nav">
            <li className="nav__item"><NavLink activeClassName="nav__link--active" className="nav__link" exact to="/pokemons/list">Pokemons</NavLink></li>
            <li className="nav__item"><NavLink activeClassName="nav__link--active" className="nav__link" exact to="/pokemons/favorites">Favorites</NavLink></li>
            <li className="nav__item"><button onClick={handeLogout} className="nav__link nav__link--btn">Logout</button></li>
          </ul>
      </nav>
    )
  }

  return (
    <nav className="nav">
          <p className="nav__title">Pokodex</p>
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
  }
}
export default connect(mapStateToProps, {unauthenticated})(Nav);
