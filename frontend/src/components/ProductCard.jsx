import React from 'react'
import { ProductCardWrapper } from '../wrappers/productcard'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({ data }) => {
  const { images, name, price } = data
  // console.log(data)

  const navigate = useNavigate()
  return (
    <>
      <ProductCardWrapper onClick={() => navigate('/products/productview' ,{state:data})}>
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