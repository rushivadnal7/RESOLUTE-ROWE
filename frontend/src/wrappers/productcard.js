import styled from "styled-components";

export const ProductCardWrapper = styled.div`
  height: 450px;
  width: 300px;
  border-radius: 2px;
  background-color: black;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.7);
  padding: 10px;
  flex: 0 0 auto;
  color: white;
  transition:  all 0.3s ease;

  .image {
    border-radius: 8px;
    width: 100%; /* Make image take full width */
    height: 85%; /* Make image take full height */
    object-fit: cover; /* Cover the div, maintaining aspect ratio */
  }

  .product-card-container {
    width: 100%;
    height: 15%;
    padding: 0.2rem 1rem;
  }

  &:hover{
    transform: scale(1.01);
    /* box-shadow: 2px 2px 20px white; */
    filter: drop-shadow(0 -2mm 4mm #002147);
  }

`;
