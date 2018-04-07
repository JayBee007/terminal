import React from 'react';
import { connect } from 'react-redux';

import Loader from '../Loader';
import Card from './components/Card';
import Error from '../Error';
import Search from '../Search';
import Pagination from '../Pagination';

import { getPokemonRequest } from '../../redux/action';

class PokemonList extends React.Component {

  state = {
    pokemons: this.props.pokemons.data,
    // offset: 0,
    limit: 20,
    currentPage: 0,
  }

  changeLimit = (limit) => {
    console.log(limit);
    const { getPokemonRequest } = this.props;
    this.setState((prevState) => ({
      currentPage: 0,
      limit: limit
    }),() => {
      const {currentPage, limit } = this.state;
      const offset = currentPage * limit;
      getPokemonRequest(limit,offset);
    })
  }

  handleNext = () => {
    const { getPokemonRequest } = this.props;
    this.setState((prevState) => {
      return {
        currentPage:prevState.currentPage + 1
      }
    },() => {
      const {currentPage, limit } = this.state;
      const offset = currentPage * limit;
      getPokemonRequest(limit,offset);
    })
  }

  handlePrev = () => {
    const { getPokemonRequest } = this.props;
    this.setState((prevState) => {
      if(prevState.currentPage === 0) {
        return {
          currentPage: prevState.currentPage
        }
      }
      return {
        currentPage:prevState.currentPage - 1
      }
    },() => {
      const {currentPage, limit } = this.state;
      const offset = currentPage * limit;
      getPokemonRequest(limit,offset);
    })
  }

  componentDidMount() {
    const { getPokemonRequest, pokemons } = this.props;
    if(pokemons.data.length < 1) {
      getPokemonRequest();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      pokemons: nextProps.pokemons.data
    }));
  }

  searchFilter = (filterString) => {
    const regex = new RegExp(filterString, 'gi');
    const filteredPokemon = this.props.pokemons.data.filter(pokemon => {
      return pokemon.name.match(regex) || pokemon.abilities.some(ability => ability.match(regex)) || pokemon.types.some(type => type.match(regex));
    });

    this.setState(() => ({
      pokemons: filteredPokemon
    }));
  }

  filterByTags = (filterString) => {

    const regex = new RegExp(filterString, 'gi');
    const filterPokemon = this.props.pokemons.data.filter(pokemon => {
      return pokemon.abilities.some(ability => ability.match(regex)) || pokemon.types.some(type => type.match(regex));
    });
    this.setState(() => ({
      pokemons: filterPokemon
    }));
  }

  render() {
    const { pokemons } = this.props;
    const { requesting, successful, errors } = pokemons;
      return (
        <section className="list">
        <div className="list__meta">
          <Search filterPokemon={this.searchFilter} />
          <Pagination next={this.handleNext} prev={this.handlePrev} changeLimit={this.changeLimit} />
        </div>

        {
          requesting &&
          <Loader isLoading={requesting} />
        }
        <div className="list__card">
        { successful &&
          this.state.pokemons.map(pokemon => (
            <Card key={pokemon.id}
                   avatar={pokemon.image}
                   name={pokemon.name}
                   abilities={pokemon.abilities}
                   types={pokemon.types}
                   id={pokemon.id}
                   filterByTags={this.filterByTags} />
           ))
        }
        </div>

        {
          errors &&
          <Error name={errors.name} message={errors.message} />
        }
        </section>
      )
    }
  }


function mapStateToProps(state) {
  return {
    pokemons: state.pokemons
  }
}

export default connect(mapStateToProps, { getPokemonRequest })(PokemonList);
