import React from 'react';
import { ProductCardWrapper } from '../wrappers/productcard';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const { images = [], name = 'Product Name', price = 'Product Price', _id } = data;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <ProductCardWrapper onClick={handleCardClick}>
      <img
        loading="lazy"
        className="image"
        src={images.length > 0 ? images[0] : '/placeholder.jpg'}
        alt={name}
      />
      <div className="product-card-container">
        <h1>{name}</h1>
        <span>{price}</span>
      </div>
    </ProductCardWrapper>
  );
};

export default ProductCard;
