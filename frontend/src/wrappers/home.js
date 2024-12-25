import styled from "styled-components";

export const HomeWrapper = styled.section`
  width: 100vw;
  background-color: black;
  font-family: "Roboto Condensed", sans-serif;
  font-family: "Poppins", sans-serif;


  @keyframes heroImageAnimation {
    0%{
      transform: translateY(100%);
      opacity: 0.1;
      scale: 0.7;
    }
    100%{
      transform: translateY(0%);
      opacity: 1;
      scale: 1.001;
    }
  }
  @keyframes heroTextAnimation {
    0%{
      transform: translateX(-100%);
      opacity: 0.1;
      scale: 0.7;
    }
    100%{
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
      /* padding: 1rem 3rem; */
      display: flex;
      /* border: 1px solid red; */
      flex-direction: column;
      justify-content: start;
      align-items: center;
      text-align: center;

      .hero-title {
        color: white;
        font-size: 90px;
        font-weight: bold;
        animation: heroTextAnimation 2.5s ease 0s 1 normal none;
      }
      
      .buttons {
        animation: heroImageAnimation 2.5s ease 0s 1 normal none;
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

      .hero-image{
        width: 600px;
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
    /* border: 1px solid black; */
    width: 100vw;
    height: 130vh;
    padding: 20px;
    /* background-color: #36454f; */
    background-color: black;

    .scrolling-container::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari, etc. */
    }

    .scrolling-container {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 0px 20px;
      flex-wrap: nowrap; /* Items in a single row */
      gap: 2rem; /* Space between items */
      justify-content: flex-start;
      align-items: center;
      overflow-x: auto; /* Horizontal scrolling */
      scroll-behavior: smooth; /* Smooth scrolling */

      /* Hides scrollbar in most browsers */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */

      /* Webkit-based browsers (Chrome, Safari) */
      &::-webkit-scrollbar {
        display: none;
      }
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
      width: 70%;
      height: 90%;
      padding: 2rem;
      /* background-color: whitesmoke; */
      display: flex;

      .product-display {
        width: 50%;
        padding: 1rem;
        height: 100%;
        /* border: 1px solid white; */
        display: flex;
        justify-content: center;
        align-items: center;

        .product-image {
          width: 100%;
          height: 100%;

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
        justify-content: space-around;
        gap: 1rem;

        .information {
          display: flex;
          flex-direction: column;
          /* gap:10px; */
          /* border: 1px solid black; */

          .branding {
            font-size: small;
            font-weight: 300;
          }

          .product-title {
            font-size: 40px;
            /* letter-spacing: px; */
            /* margin-top: 2rem; */
            font-weight: 600;
          }

          .pricing {
            font-size: 20px;
            font-weight: 400;
          }
        }

        .payment-gateway {
          width: 100%;
          /* border: 1px solid black; */

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
            /* padding: 10px; */
            border-radius: 4px;
            width: 80px;
            /* height: 50px; */
            /* border: 1px solid black; */

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .buy-addtocart-buttons {
          /* border: 1px solid black; */
          justify-content: center;
          align-items: start;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          /* .buy-button {
            width: 80%;
            border: 1.5px solid black;
            border-radius: 5px;

            padding: 0.5rem 5rem;
          } */

          /* .add-to-cart-button {
            padding: 0.5rem 5rem;
            color: white;
            border-radius: 5px;
            background-color: black;
            width: 80%;
          } */
        }
      }
    }
  }

  .playfull-page {
    background-color: black;
    /* background-color: #36454f; */
    backdrop-filter: blur(15px);
    position: relative;

    .gradient-background-image{
      position: absolute;
      top: 0;
      left: 0;
      z-index: -100;
    }

    canvas{
      width: 50%;
      height: 100%;


    }

    .info-container{
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding: 1rem;
      
      h1{
        color: white;
        font-size: xx-large;
      }

      p{
        color: gray;
      }
    }
  }

  
`;
