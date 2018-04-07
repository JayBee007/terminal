import React from 'react';

const Search = (props) => {

  const handleOnChange = (e) => {
    console.log(e.target.value);
  }

  return(
    <div className="search">
      <form className="search__form">
        <input className="search__input" type="text" onChange={handleOnChange} />
      </form>
    </div>
  )
}

export default Search;
