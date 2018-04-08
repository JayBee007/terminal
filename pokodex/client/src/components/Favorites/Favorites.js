import React from 'react';
import { connect } from 'react-redux';

import { pokemonFavRequest } from '../../redux/action';

import Loader from '../Loader';
import Card from '../PokemonList/components/Card';
class Favorites extends React.Component {

  componentDidMount() {
    this.props.pokemonFavRequest();
  }

  render() {
    const { requesting, successful, errors} = this.props.fav;
    return(
        <section className="list">
        {
          requesting &&
          <Loader isLoading={true} />
        }
          <div className="list__card">
            { successful &&
              this.props.fav.data.map(pokemon => {
                {
                  return pokemon.isFav &&
                  (
                    <Card key={pokemon.id}
                          avatar={pokemon.image}
                          name={pokemon.name}
                          abilities={pokemon.abilities}
                          types={pokemon.types}
                          id={pokemon.id}
                          isFav={pokemon.isFav} />
                  )
                }
              })
            }
          </div>
        </section>
      );
  }
}

function mapStateToProps(state) {
  return {
    fav: state.fav
  }
}

export default connect(mapStateToProps, { pokemonFavRequest })(Favorites);
