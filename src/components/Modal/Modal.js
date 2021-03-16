import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { CustomButton } from './themes/themes';

import './Modal.scss';

function Modal({ selectedProduct, onCloseModal }) {
  const { name, description, picture, price } = selectedProduct;

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal__header">
          <IconButton aria-label="close" onClick={ () => onCloseModal() }>
            <CloseIcon fontSize="large" style={ { color: '#000000' } } />
          </IconButton>
        </div>
        <div className="modal__main">
          <img className="modal__image" src={ picture } alt={ name } />
          <div className="modal__product-info">
            <p className="modal__product-heading">{ name }</p>
            <p className="modal__product-cost">{ `$${price}` }</p>
            <p className="modal__product-description-heading">Description</p>
            <p className="modal__product-description">{ description }</p>
            <CustomButton variant="contained" color="secondary" endIcon={<ShoppingCartIcon />}>Add to cart</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
