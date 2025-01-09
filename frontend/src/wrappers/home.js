import styled from "styled-components";
import { media } from "../helper/mediaHelper";

export const HomeWrapper = styled.section`
  width: 100vw;
  background-color: black;
  font-family: "Roboto Condensed", sans-serif;
  font-family: "Poppins", sans-serif;

  @keyframes heroImageAnimation {
    0% {
      transform: translateY(100%);
      opacity: 0.1;
      scale: 0.7;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
      scale: 1.001;
    }
  }
  @keyframes heroTextAnimation {
    0% {
      transform: translateX(-100%);
      opacity: 0.1;
      scale: 0.7;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
      scale: 1.001;
    }
  }

  .hero {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    /* background-color: #16161d; */
    background-color: black;
    /* position: relative; */

    img {
      width: 15rem;
      height: auto;
    }

    .left-container {
      width: 50%;
      height: 100%;
      margin: auto 0px;
      /* padding: 1rem 3rem; */
      display: flex;
      /* border: 1px solid red; */
      flex-direction: column;
      /* justify-content: ; */
      align-items: center;
      text-align: center;

      .hero-title {
        color: white;
        margin: 4rem;
        font-size: 8rem;
        font-weight: bold;
        animation: heroTextAnimation 2.5s ease 0s 1 normal none;

        ${media("lg")`
          font-size: 6rem;
       `}
      }

      .buttons {
        animation: heroTextAnimation 2.5s ease 0s 1 normal none;
        color: white;
        display: flex;
        gap: 2rem;
      }
    }

    .right-container {
      width: 50%;
      height: 100%;
      /* padding: 3rem; */
      display: flex;
      justify-content: start;
      align-items: start;
      position: relative;

      .hero-image {
        width: 1400px;
        height: auto;
        filter: drop-shadow(8px 5px 5px gray);
        animation: heroImageAnimation 2.5s ease 0s 1 normal none;
      }
    }
  }

  .marquee {
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    background-color: #3b3c36;
    padding: 4rem 1rem;
    text-transform: uppercase;
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 600;

    .text-container {
      display: flex;
      overflow: hidden;
      width: 100%;
      /* gap: 2rem; */
      color: white;
      letter-spacing: 5px;
      border-top: 2px solid white;
      border-bottom: 2px solid white;
      font-size: 150px;

      white-space: nowrap;

      .text {
        padding-right: 1rem;
      }
    }
  }

  .trending-page {
    border-radius: 20px 20px 0px 0px;
    width: 100vw;
    height: 130vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: black;
    position: relative;

    .title-trending {
      padding: 2rem;
      color: white;
      font-size: 3rem;
      font-weight: bold;
    }

    .scrolling-container {
      width: 100%;
      height: max-content;
      display: flex;
      padding: 0px 2rem;
      flex-wrap: nowrap;
      gap: 2rem;
      justify-content: flex-start;
      align-items: center;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .arrow-controls {
    }

    .arrow {
      position: absolute;
      top: 50%; /* Center arrows vertically */
      width: 100%;
      display: flex;
      justify-content: space-between;
      /* transform: translateY(-50%); */
      z-index: 10;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 2rem;
      cursor: pointer;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: background-color 0.3s, transform 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        /* transform: scale(1.1); */
      }

      &:active {
        transform: scale(0.9);
      }
    }

    .left-arrow {
      position: absolute;
      left: 10px;
    }

    .right-arrow {
      position: absolute;
      right: 10px;
    }
  }

  .best-seller-page {
    width: 100%;
    color: black;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px 20px 0px 0px;

    h1 {
      height: 10%;
      width: 100%;
      text-align: center;
      padding: 3rem;
      font-size: 50px;
      font-weight: 500;
    }

    .product-container {
      width: 100%;
      height: 90%;
      padding: 2rem;
      display: flex;

      ${media("lg")`
        width:70%;
        padding:4rem;
      `}

      .product-display {
        width: 50%;
        padding: 1rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .product-image {
          width: auto;
          height: auto;

          /* ${media("lg")`
        width:200px;
        height:400px;
      `} */

          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
          }
        }
      }
      .product-details {
        /* border: 1px solid white; */
        width: 50%;
        height: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;

        .information {
          display: flex;
          flex-direction: column;
          .branding {
            font-size: medium;
            font-weight: 300;
          }

          .product-title {
            font-size: 40px;
            font-weight: 600;
          }

          .pricing {
            font-size: 4rem;
            font-weight: 400;
          }
        }

        .payment-gateway {
          width: 100%;
          h2 {
            margin: 8px 0px;
            font-size: larger;
            font-weight: 500;
          }

          .gateway-options {
            width: 100%;
            display: flex;
            gap: 1rem;
          }

          .razorpay,
          .gpay {
            background-color: rgba(0, 0, 0, 0.03);
            border-radius: 4px;
            width: 80px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .buy-addtocart-buttons {
          justify-content: center;
          align-items: start;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      }
    }
  }

  .playfull-page {
    background-color: black;
    /* background-color: #36454f; */
    backdrop-filter: blur(15px);
    position: relative;

    .gradient-background-image {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -100;
    }

    canvas {
      width: 50%;
      height: 100%;
    }

    .info-container {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding: 1rem;

      h1 {
        color: white;
        font-size: xx-large;
      }

      p {
        color: gray;
      }
    }
  }
`;
