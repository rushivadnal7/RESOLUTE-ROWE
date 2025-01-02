import React from 'react'
import { ProductCardWrapper } from '../wrappers/productcard'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({ data }) => {
  const { images, name, price } = data

  const navigate = useNavigate()

  const CardbuttonHandler = () => {
    scrollTo(0, 0);
    navigate('/products/productview' ,{state:data})
  }
  return (
    <>
      <ProductCardWrapper onClick={CardbuttonHandler}>
        <img className='image' src={images? images[0] : ''} alt={name} />
        <div className="product-card-container">
          <h1>{name? name : ''}</h1>
          <span>{price? price : ""}</span>
        </div>
      </ProductCardWrapper>
    </>
  )
}

export default ProductCard;