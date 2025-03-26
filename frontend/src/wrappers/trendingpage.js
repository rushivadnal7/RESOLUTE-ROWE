import styled from "styled-components";

export const TrendingPageWrapper = styled.section`
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
      padding: 2rem;
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

      .skeleton-cards {
      display: flex;
      justify-content: center;
      gap: 3rem;
    }

      .skeleton-card {
      width: 300px;
      height: 450px;
      flex: none;
      background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 10px;
    }

    }

    .arrow-controls {
    }

    .arrow {
      position: absolute;
      top: 50%; 
      width: 100%;
      display: flex;
      justify-content: space-between;
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
`