import styled from "styled-components";

export const AllproductWrapper = styled.div`
  width: 100vw;
  height: max-content;
  background-color: #151515;
  padding: 2rem 12rem;
  scroll-behavior: smooth;
  color: white;

  .header {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .availability {
      cursor: pointer;
      margin: 0px 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .availability-selection-option {
        position: absolute;
        top: 100%; /* Positions the dropdown just below the availability filter */
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
        transition: max-height 0.3s ease-in-out;
      }

      .availability-selection-option.open {
        max-height: 200px; /* Adjust based on the content size */
        /* display: block; */
      }

      .availability-selection-option.closed {
        max-height: 0;
        visibility: hidden;
        /* display: none; */
      }

      .availability-filter {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .instock-option,
      .out-of-stock-option {
        display: flex;
        /* gap: 10px; */
        height: 2.5rem;
      }

      /* Hide the native checkbox */
      .instock-option input[type="checkbox"],
      .out-of-stock-option input[type="checkbox"] {
        position: absolute;
        justify-content: center;

        display: flex;
        opacity: 0;
        cursor: pointer;
      }

      /* Style the label that will act as the custom checkbox */
      .custom-checkbox {
        display: inline-block;

        width: 10pxpx;
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
        top: 100%; /* Positions the dropdown just below the availability filter */
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

  .product-list {
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

export const StyledProductList = styled.div``;
