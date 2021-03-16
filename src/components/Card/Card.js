import React from 'react';

import { CustomButton } from './themes/themes';

import './Card.scss';

function Card({ product, onSelectProduct }) {
  const { id, name, picture, price } = product;

  return (
    <div className="card">
      <img className="card__image" src={ picture } alt={ name } />
      <p className="card__name">{ name }</p>
      <div className="card__cost-block">
        <p className="card__price">{ `$ ${price}` }</p>
        <CustomButton variant="contained" color="secondary" onClick={ () => onSelectProduct(id) }>Details</CustomButton>
      </div>
    </div>
  );
}

export default Card;
