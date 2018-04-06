import React from 'react';

const Card = (props) => {
  // const { pokemon } = props;
  const { avatar, types, abilities, name, id} = props;
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
        <p className="card__sec-text">type</p>
        {
          abilities.map((ability, i) => (<button className="card__btn" key={i}>{ability}</button>))
        }
      </div>

      <div className="card__type">
        <p className="card__sec-text">ability</p>
        {
          types.map((type, i) => (<button className="card__btn" key={i}>{type}</button>))
        }
      </div>

    </div>
  )
}

export default Card;
