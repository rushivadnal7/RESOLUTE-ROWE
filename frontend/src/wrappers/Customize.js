import styled from "styled-components";

export const CustomizeWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f2f0ef;
  margin-top: 5.5rem;


  .surface-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: center;

    .board {
      width: 500px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      /* box-shadow: 5px 5px 50px 50px rgba(0, 0, 0, 0.1); */

      .drag-drop-message{
        width: 100%;
        height: 3rem;
        color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        img{
          width: 2rem;
          height: 2rem;
        }
      }

      .tshirt{
        width: 400px;
        height: 450px;
        
        .front-side-tshirt-view-container{
          position: relative;
          width: 100%;
          height: 100%;
          
        }
        
        .back-side-tshirt-view-container{
          position: relative;
          width: 100%;
          height: 100%;

        }
        
        .type-of-tshirt{
          width: auto;
          height: auto;
          /* -webkit-filter: drop-shadow(5px 5px 5px #222);
          filter: drop-shadow(4px 4px 10px #222); */
        }

        .design-of-the-tshirt-front{
          width: 150px;
          height: auto;
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%,-35%);
          z-index: 20;
        }
        .design-of-the-tshirt-back{
          width: 150px;
          height: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          /* border: 1px solid red; */
          transform: translate(-50%,-50%);
          z-index: 20;
        }
      }

    }
  }

  .tshirts-sidebar {
    height: 100%;
    color: gray;
    width: 250px;
    /* background-color: black; */
    /* background-image:linear-gradient(to bottom, #274060, #1B2845); */
    background-color: #f2f0ef;


    box-shadow: 5px 0px 20px rgba(0, 0, 0, 0.6);

    .front-back-side-option {
      width: 100%;
      height: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      font-size: smaller;
      overflow: hidden;

      /* Add the sliding bar */
      .slider {
        position: absolute;
        width: 50%;
        height: 100%;
        background-color: white;
        transition: transform 0.4s ease;
      }

      span {
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50%;
        z-index: 1;
        transition: color 0.4s ease;
        border-bottom: 1px solid white;
      }

      .front {
        border-right: 1px solid white;
      }
      .back {
        border-left: 1px solid white;
      }

      .selected {
        color: black;
      }
    }

    .tshirt-type-option{
      border-bottom: 1px solid black;
      width: 100%;
      height: 70%;
      display: flex;
      justify-content: space-around;
      overflow-y: auto;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      padding: 10px;

      .tshirt-view{
        width: 100px;
        height: 120px;
        position: relative;
        transform: scale 0.3s ease;
        cursor: grab;

        h1{
          position: absolute;
          font-size: x-small;
          top: 50%;
          left: 50%;
        }

        img{
          width: 100%;
          height: 100%;
        }

      }

      .tshirt-view:hover{
        transform: scale(1.1);
      }
    }

    .color-option{
      border-bottom: 1px solid black;
      width: 100%;
      height: 15%;
      text-align: center;

      .colors-container{
        display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;

        .color-circle{
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
      }

      .black{
        background-color: black;
      }
      .white{
        background-color: white;
      }

      .beige{
        background-color: beige;
      }
      .blue{
        background-color: #274060;
      }
    }

    .size-option{
      height: 10%;
      width: 100%;
      display: flex;
      /* gap: 1rem; */
      justify-content: space-around;
      /* padding: 0px ; */
      align-items: center;

      .sizes{
        padding: 2px 10px;
        cursor: pointer;
      }
      
      .selected{
        border-radius: 2px;
        background-color: #f2f0ef;
        border: 1px solid white;
        color: black;
        transition: all 0.3s ease;
      }
    }
  }
`;

