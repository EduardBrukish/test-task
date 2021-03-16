import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, Modal } from '../../components';

import './Products.scss';

function Products({ history }) {
  const [products, setProducts] = useState([]);
  const [modalState, setModalState] = useState({ open: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) history.push('/');

    async function getData() {
      try {
        const response = await axios.get(
          'https://test-api.updivision.work/api/products',
          { headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            }
        });
        const { data } = response;
        setProducts(data);
      } catch ({ response }) {
        history.push('/');
      }
    };

    getData();
  }, []);

  const onSelectProduct = (id) => {
    const selectedProduct = products.find((product) => product.id === id);

    if (!selectedProduct) return;

    setModalState(({ open: true, selectedProduct }));
  };

  const onCloseModal = () => {
    setModalState({ open: false });
  };

  const renderCard = (product) => {
    return (
      <Card 
        key={ product.id } 
        product={ product } 
        onSelectProduct={ onSelectProduct } 
      />
    );
  };

  return (
    <div className="products">
      <div className="products__wrapper">
        { products.map(renderCard) }
      </div>
      { modalState.open 
        && ( <Modal selectedProduct={ modalState.selectedProduct } onCloseModal={ onCloseModal } /> ) }
    </div>
  );
}

export default Products;
