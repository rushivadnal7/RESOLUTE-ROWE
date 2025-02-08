import styled from "styled-components";

export const AllproductWrapper = styled.div`
  width: 100vw;
  height: max-content;
  background-color: #151515;
  padding: 2rem 12rem;
  scroll-behavior: smooth;
  color: white;
  position: relative;
  margin-top: 5.5rem;

  .header {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .mobile-view-filter-icon{
      display: none;
    }
    .gender {
      cursor: pointer;
      margin: 0px 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .gender-selection-option {
        position: absolute;
        top: 100%; /* Positions the dropdown just below the gender filter */
        left: -100%;
        z-index: 999;
        width: 200px;
        color: black;
        padding: 1rem;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-height: 0;
        overflow: hidden;
        transition: all 0.2s ease-in-out;
      }

      .gender-selection-option.open {
        max-height: 200px; /* Adjust based on the content size */
        /* display: block; */
      }

      .gender-selection-option.closed {
        max-height: 0;
        visibility: hidden;
        /* display: none; */
      }

      .gender-filter {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .men-option,
      .women-option {
        display: flex;
        /* gap: 10px; */
        height: 2.5rem;
      }

      /* Hide the native checkbox */
      .men-option input[type="checkbox"],
      .women-option input[type="checkbox"] {
        position: absolute;
        justify-content: center;

        display: flex;
        opacity: 0;
        cursor: pointer;
      }

      /* Style the label that will act as the custom checkbox */
      .custom-checkbox {
        display: inline-block;

        width: 10px;
        height: 10px;
        background-color: #f0f0f0; /* Background of unchecked state */
        border: 2px solid #ccc;
        border-radius: 4px; /* Add rounding to checkbox */
        position: relative;
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }

      /* When the input (checkbox) is checked, style the checkbox */
      input[type="checkbox"]:checked + .custom-checkbox {
        background-color: #007bff; /* Checked background color */
        border-color: #007bff;
      }

      /* Create the checkmark using pseudo-elements */
      .custom-checkbox::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        top: 2px;
        left: 7px;
        opacity: 0; /* Hidden by default */
        transition: opacity 0.1s ease;
      }

      /* Show the checkmark when the checkbox is checked */
      input[type="checkbox"]:checked + .custom-checkbox::after {
        opacity: 1; /* Show checkmark */
      }

      /* Label styling */
      label {
        margin-left: 8px;
        font-size: 16px;
        cursor: pointer; /* Cursor pointer on the label */
      }

      span {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
      }
    }
    .price-range {
      cursor: pointer;
      margin: 0px 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .price-range-filter {
        display: flex;
        cursor: pointer;
        align-items: center;
      }

      .price-range-dropdown {
        position: absolute;
        top: 100%; /* Positions the dropdown just below the gender filter */
        left: -100%;
        z-index: 999;
        width: 300px;
        color: black;
        padding: 1rem;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
      }

      .price-range-dropdown.open {
        max-height: 200px; /* Adjust based on the content size */
        /* display: block; */
      }

      .price-range-dropdown.closed {
        max-height: 0;
        visibility: hidden;
        /* display: none; */
      }
      span {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
      }
    }
  }

  .filter-slider{
    display: none;
    /* background-color: ; */
  }

  .product-list {
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem 0px;
    flex-wrap: wrap;
    gap: 3rem;

    /* overflow-y: auto; */
    scroll-behavior: smooth; /* Smooth scrolling */
    /* Hides scrollbar in most browsers */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */

    /* Webkit-based browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
      display: none;
    }

    .skeleton-cards {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 3rem;
    }

    .skeleton-card {
      width: 300px;
      height: 400px;
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

    .no-products-found {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 2rem;
        font-weight: bolder;

        a {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  .product-list::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem 0px;

    .header{
      width: 100vw;
      justify-content: start;
      align-items: center;
      padding: 0px 3rem;
      gap: 0.5rem;

      .mobile-view-filter-icon{
        display: flex;
        /* width: 100%; */
        gap: 2rem;
      }
      
      .gender , .price-range{
        display: none;
      }
    }

    .filter-slider{
      display: flex;
      flex-direction: column;
      width: max-content;
      height: max-content;
      position: fixed;
      top: 5.5rem;
      right: -100%;
      transition: all 0.4s ease;
      z-index: 1000;
      background-color: black;
      gap: 2rem;
      justify-content: start;
      align-items: start;
      padding: 1rem 2rem;

      svg{
        align-self: end;
      }

      .price-range-slider{
        display: flex;
        flex-direction: column;
      }
      
      .gender-selection-  option{
        display: flex;
        flex-direction: column;
        gap: 3rem;
      } 
      .gender , .price-range {
        flex-direction: column;
        gap: 2rem;
      }

      

      
    }

    .open{
      right:0;
    }
    .close{
      right: -100%;
    }
  }
`;

export const StyledProductList = styled.div``;
