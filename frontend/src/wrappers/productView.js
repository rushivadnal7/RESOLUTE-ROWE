import styled from "styled-components";

export const ProductViewWrapper = styled.section`
  overflow: hidden;
  color: #4b5563;
  position: relative;
  .sizechart{
    
  }
`;

export const Container = styled.div`
width: 100vw;
  padding: 4rem 5rem;

  margin: auto;
  /* display: flex; */
  display: grid;
  grid-template-areas:
    'images details'
    'more-products more-products';
    grid-template-columns: 65% 35%;
gap: 2rem;
`;


export const ProductImages = styled.div`
  max-width: 100%;
  height: 100vh;
  grid-area: images;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  
  
  img {
    height: 450px;
    width: 350px;
    object-fit: cover;
  }

  .skeleton {
    content: "";
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton::placeholder {
    color: transparent;
    
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  `;

export const ContentWrapper = styled.div`
  max-width: 100%;
  grid-area: details;
  display: flex;
  flex-direction: column;
  align-items: start;

`;

export const Title = styled.h2`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ProductName = styled.h1`
  color: #1f2937;
  font-size: 2.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const RatingStars = styled.span`
  display: flex;
`;

export const RatingText = styled.span`
  margin-left: 0.75rem;
  color: #4b5563;
`;

export const SocialIcons = styled.span`
  display: flex;

  gap: 10px;
  border: #6b7280 2px solid;
  margin-left: 0.75rem;
  padding: 0.5rem;
  /* border-left: 2px solid #e5e7eb; */

  a {
    color: #6b7280;
    margin: 0 0.5rem;
  }
`;

export const Description = styled.p`
  line-height: 1.5;
  color: #4b5563;
  margin-top: 1rem;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid #e5e7eb;
`;

export const ColorOptions = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  span {
    margin-right: 0.75rem;
  }

  .color-btn {
    border: 2px solid #d1d5db;
    border-radius: 9999px;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.25rem;
    background-color: gray;
  }
`;

export const SizeOptions = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  margin-left: 1.5rem;
  gap: 10px;

  select {
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    outline: none;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  align-items: start;
  justify-content: space-around;
  gap: 2rem ;
  margin-top: 1.5rem;
  width: 100%;
`;

export const Price = styled.span`
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #d1d5db;
  border-radius: 2px;
  width: 8rem;
  padding: 0.2rem 0.5rem;
`;

export const QuantityButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  color: #6b7280;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: #111827;
  }
`;

export const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: #111827;
`;



export const AddToCartButton = styled.button`
  margin-left: auto;
  color: #fff;
  background-color: #6366f1;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4f46e5;
  }
`;

export const FavoriteButton = styled.button`
  margin-left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  border: none;
`;

export const PaymentGateway = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;

  img {
    width: 70px;
    height: auto;
  }
`;

export const ProductDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: small;
  gap: 1rem;

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  ol {
    list-style: decimal;
  }
`;

export const FabricDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: small;
  gap: 1rem;

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const PrintDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: small;
  gap: 1rem;

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
export const ShareButton = styled.div`
  display: flex;
  font-size: small;
`;

export const RelatedProductsList = styled.div`
  width: 100%;
  height: max-content;
  grid-area: more-products;

  h1{
    font-size: 1.5rem;
    margin: 1rem;
    font-weight: 600;
  }

  .other-products {
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    align-items: center;
    
    .product {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 0.4rem;
      width: 25%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 50%;
    }
  }



  
`;


export const SizeChart = styled.div`
  /* position: fixed;
    top: 50%;
    right: 0; */
     
    .size-button{
      transform: rotate(270deg);
      position: absolute;
      top: 50%;
      right: 0;
      z-index: 20;
      /* border: 1px solid red; */
      background-color: #4b5563;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      padding: 0px 10px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;

      img{
        width: 50px;
        height: 50px;
        transform: rotate(270deg);
      }
    }
`
