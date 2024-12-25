import React from "react";
import styled from "styled-components";

const Spinner = ({ size = 40 }) => {
    return <StyledSpinner size={size} />;
};

export default Spinner;

const StyledSpinner = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => size / 8}px solid #f3f3f3;
  border-top: ${({ size }) => size / 8}px solid #3498db;
  border-radius: 50%;
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
