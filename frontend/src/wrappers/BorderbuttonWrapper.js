import styled from "styled-components";

export const BorderButtonWrapper = styled.div`
  position: relative;
  width: 5.5rem;
  height: 2.5rem;
  transition: all 0.2s ease;
  font-size: small;
  /* color: white; */


  .buy-button-border {
    width: 100%;
    height: 100%;
    /* border-radius: 2px; */
    /* background-image: linear-gradient( to right, #403B4A, #E7E9BB);  */
    background-image: linear-gradient( to right, #BF953F , #FCF6BA); 

    /* background-color: white; */
  }

  .buy-button-border::before {
    content: "";
  }

  .buy-button {
    width: 5rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    background-color: ${(props) => `${props.bg}`};

  }


&:hover{
  transform: scale(0.95);
}
`;
