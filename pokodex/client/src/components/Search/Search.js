import React from 'react';

const Search = (props) => {

  const handleOnChange = (e) => {
    e.preventDefault();
    props.filterPokemon(e.target.value);
  }

  return(
      <form className="search">
        <input className="search__input" type="text" onChange={handleOnChange} />
      </form>
  )
}

export default Search;
