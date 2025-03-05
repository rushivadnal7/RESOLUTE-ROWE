import styled, { keyframes } from "styled-components";
import { media } from "../helper/mediaHelper";

const scaleUp = keyframes`
 from {
    transform: translate(-50%, -50%) scale(0.5); /* Starts small */
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1); /* Grows to normal size */
    opacity: 1;
  }
`



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

  @keyframes spinBlob {
    0% {
        transform: rotate(0deg) scale(2);
    }

    100% {
        transform: rotate(1turn) scale(2);
    }
}

  .hero {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    margin-top: 5.5rem;
    background-color: #000;
    background-attachment: fixed;
    background-size: cover;
    position: relative;

    .mobile-view-bg-image {
      display: none;
    }
    img {
      width: 15rem;
      height: auto;
      ${media("md")`
          display:none;
       `}
    }

    .blob-container {
      height: 100%;
      width: 100%;
      inset: 0;
      margin: auto;
      filter: blur(100px);
      opacity: 0.4;

      .blob-inner-container {
        border-radius: 99999px;
        position: absolute;
        inset: 0;
        margin: auto;
        width: 100vw;
        height: 100vh;
        min-width: 1000px;
        overflow: hidden;
        background-color: #fff;
        transform: scale(0.6);
        z-index:-2000;

        .blob {
          position: absolute;
          width: 100vw;
          height: 100vh;
          z-index:-2000;
          inset: 0;
          margin: auto;
            background: conic-gradient(
              from 0deg,
              #002F6C,
              #5B2A91 ,
              #C12D82,
              purple,
              blue
            );
          /* background: conic-gradient(
            from 0deg,
            purple,
            green,
            purple,
            green,
            purple
          ); */
          animation: spinBlob 8s linear infinite;
        }
      }

      .hero-title {
        color: white;
        margin: 4rem;
        font-size: 8rem;
        font-family: "Exo 2", serif;
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

    .logo-container {
      display: none;
    }

    .main-container {
      width: 100%;
      height: 100%;
      
      h1{
        color:white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        z-index: 110;
      }
      
      .hero-image {
        position: absolute;
        top: 50%;
        transform-origin: center;
        left: 50%;
        transform:translate(-50%,-50%);
        z-index: 100;
        width: max-content;
        height: max-content;
        animation: ${scaleUp} 1.5s ease-in-out;
      }
    }
  }

  .marquee {
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    background-color: #000;
    /* background-color: #3b3c36;  */
    padding: 4rem 1rem;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    /* font-family: "Barlow Condensed", sans-serif; */
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
    color: white;
    height: max-content;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px 20px 0px 0px;

    h1 {
      height: max-content;
      width: 100%;
      text-align: center;
      /* padding: 0; */
      font-size: 50px;
      font-weight: 500;
      /* border:1px solid red; */
    }

    .product-container {
      /* border:1px solid red; */
      width: 100%;
      height: 600px;
      /* padding: 1rem; */
      display: flex;

      ${media("lg")`
        width:70%;
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

          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
          }
        }
      }
      .product-details {
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
            font-size: 2rem;
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
            width: 60px;
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
    padding: 8rem;
    display: flex;
    height: max-content;
    width: 100%;

    .gradient-background-image {
      height: 100%;
      display:none;
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
        text-align: justify;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 5.5rem; //make

    .hero {
      position: relative;

      .mobile-view-bg-image {
        display: block;
        width: 100%;
        height: 100%;
        /* opacity: 0.5; */
        
        img {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 100%;
          height: max-content;
        }
      }

      .logo-container {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .left-container {
        width: 100%;
        height: 100%;
        justify-content: center;

        .hero-title {
          margin: 0;
          font-size: 4rem;
          font-family: "Exo 2", serif;
          font-weight: bold;
          animation: none;
        }

        .buttons {
          display: none;
        }
      }
      .main-container {
        display: none;

        img {
          display: none;
        }
      }
    }
    .best-seller-page {
      height: max-content;
      padding: 2rem;
      .product-container {
        flex-direction: column;
        gap: 1rem;
        height: max-content;

        .product-display,
        .product-details {
          width: 100%;
          height: max-content;
        }

        .product-image {
          width: auto;
          height: 300px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .playfull-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;

      .canvas {
        width: 100%;
        height: 50%;
      }
      .info-container {
        width: 100%;
        height: 50%;
        padding: 2rem;
      }
    }

    .marquee {
      .text-container {
        font-size: 80px;
      }
    }
  }
`;
