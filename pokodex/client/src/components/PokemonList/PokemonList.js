import React from 'react';
import { connect } from 'react-redux';

import { getPokemonRequest } from '../../redux/action';

const PokemonList = (props) => {
  const getPokemons = () => {
    props.getPokemonRequest(20,20);
  }
  return(
    <div onClick={getPokemons} style={{cursor: 'pointer'}}>
      List
    </div>
  );
}

export default connect(null, { getPokemonRequest })(PokemonList);
