// cart.js
import styled from "styled-components";

export const CartWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  padding: 40px;
  background-color: #f5f5f5;
  height: 100vh;
  margin-top: 5.5rem;


  .cart-info {
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 5.5rem;
    height: max-content;

    .cart-info{

      flex-direction: column;
    }
  }

`;

export const CartItems = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 40px;
  overflow-y: auto;

  h2 {
    font-size: xx-large;
    font-weight: bold;
  }

  .skeleton-cards {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* flex-wrap: wrap; */
    gap: 3rem;
  }

  .skeleton-card {
    width: 100%;
    height: 100px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;

    @media (max-width: 768px) {
      width: 80px;
      height: 100px;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
  }

`;

export const CartItem = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;

  img {
    width: 60px;
    height: auto;
    margin-right: 20px;
    border-radius: 8px;
  }

  div {
    flex-grow: 1;
  }

  h3 {
    font-size: 18px;
  }

  p {
    color: #777;
    font-size: 14px;
    margin: 5px 0;
  }

  .disabled-button {
    cursor: not-allowed;
    opacity: 0.5; /* Optional: to visually indicate it's disabled */
  }
  .disabled:disabled {
    cursor: not-allowed;
    opacity: 0.5; /* Optional: applies to all disabled buttons */
  }

  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.2s ease;
    /* color: red; */
  }
  .delete-button:hover {
    color: red;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
    /* border: 1px solid red; */
  }
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background: none;
    cursor: pointer;
    font-size: 16px;
  }

  span {
    margin: 0 10px;
    font-size: 16px;
  }
`;

export const SummarySection = styled.div`
  width: 60%;
  height: 100%;
  padding: 20px;
  border-top: 1px solid #ddd;
  border-left: 2px solid black;

  .summary-skeleton-card {
    width: 100%;
    border-radius: 7px;
    height: 150px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
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

  div {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .coupon-code {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      margin-right: 10px;
    }

    input:focus {
      outline: none;
    }

    button {
      background-color: black;
      color: white;
      padding: 0px 20px;
      transition: scale 0.3s ease;

      &:hover {
        scale: 0.95;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    border: none;
    padding: 0;
    height: max-content;

    .coupon-code {
      input{

        width: 100px;
      }
    }
  }

`;

export const PaymentInfo = styled.div`
  width: 35%;
  padding: 20px;
  /* background-color: #333; */
  background-color: black;
  color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    margin-bottom: 20px;

    button {
      padding: 10px 20px;
      background: #555;
      border: none;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background: #777;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      border: 1px solid #555;
      background-color: #222;
      color: #fff;
    }

    div {
      display: flex;
      justify-content: space-between;

      input {
        width: 48%;
      }
    }
  }
`;

export const PaymentButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
