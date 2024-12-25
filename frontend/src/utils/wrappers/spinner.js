import styled from "styled-components";

// Spinner Styles
export const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid orange; /* Change color as needed */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Spinner Container
export const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it appears above all content */
  backdrop-filter: blur(3px); /* Optional: Adds a blur effect to the background */
`;
