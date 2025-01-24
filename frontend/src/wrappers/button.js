import styled from "styled-components";

export const ButtonWrapper = styled.button`
  background-image: linear-gradient( to right, #403B4A, #E7E9BB); 
  height: max-content;
  padding: 0.5rem 2rem;
  font-size: small;
  text-transform: uppercase;
  transition: all 0.2s ease;
  color: #fff;

  &:hover{
    transform: scale(0.95);
  }
`;
