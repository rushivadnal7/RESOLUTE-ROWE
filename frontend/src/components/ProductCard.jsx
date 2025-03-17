import React from 'react'
import { ProductCardWrapper } from '../wrappers/productcard'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({ data }) => {
  const { images, name, price, _id } = data

  const navigate = useNavigate()

  const CardbuttonHandler = () => {
    setTimeout(() => {
      navigate(`/products/${_id}`);
    }, 50);
  }
  
  return (
    <>
      <ProductCardWrapper onClick={CardbuttonHandler}>
        <img loading='lazy' className='image' src={images ? images[0] : ''} alt={name && 'product-image'} />
        <div className="product-card-container">
          <h1>{name ? name : 'product-name'}</h1>
          <span>{price ? price : "product-price"}</span>
        </div>
      </ProductCardWrapper>
    </>
  )
}

export default ProductCard;