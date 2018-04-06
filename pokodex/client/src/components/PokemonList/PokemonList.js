import React from 'react';
import { connect } from 'react-redux';

import Loader from '../Loader';
import Card from './components/Card';

import { getPokemonRequest } from '../../redux/action';

class PokemonList extends React.Component {

  componentDidMount() {
    const { getPokemonRequest } = this.props;
    getPokemonRequest();
  }

  render() {
    const { pokemons } = this.props;
    const { requesting } = pokemons;
    if(requesting) {
      return <Loader isLoading={requesting} />
    }else {
      return (
        <section className="list">
        {
          pokemons.data.map(pokemon => (
            <Card avatar={pokemon.image}
                  name={pokemon.name}
                  abilities={pokemon.abilities}
                  types={pokemon.types}
                  id={pokemon.id} />
          ))
        }
        </section>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons
  }
}

export default connect(mapStateToProps, { getPokemonRequest })(PokemonList);
