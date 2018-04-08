import React from 'react';
import { connect } from 'react-redux';

import { likePokemonRequest } from '../../../redux/action';

const Card = (props) => {
  const addToFavorites = () => {
    const { id, name, avatar, abilities, types } = props;
    props.likePokemonRequest(id,name,avatar,abilities,types);
  }
  const { avatar, types, abilities, name, id, isFav, filterByTags} = props;
  return(
    <div className="card">

      <div className="card__meta">
        <p className="card__name">{name}</p>
        <p className="card__id">#{id}</p>
      </div>

      <div className="card__img-cont">
        <img className="card__img" src={avatar} />
      </div>

      <div className="card__ability">
        <p className="card__sec-text">ability</p>
        {
          abilities.map((ability, i) => (<button className="card__btn" key={i} onClick={() => filterByTags(ability)}>{ability}</button>))
        }
      </div>

      <div className="card__type">
        <p className="card__sec-text">type</p>
        {
          types.map((type, i) => (<button className="card__btn" key={i} onClick={() => filterByTags(type)}>{type}</button>))
        }
      </div>
      <div onClick={addToFavorites} className="card__like">
        <span className={isFav ? "fas fa-heart": "far fa-heart"}></span>
      </div>

    </div>
  )
}

export default connect(null, { likePokemonRequest })(Card);
