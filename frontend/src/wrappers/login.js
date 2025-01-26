import styled from "styled-components";

export const LoginWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 70%;
    height: 80%;
    display: flex;
    position: relative;
    overflow: hidden;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
  }

  .left-container,
  .right-container {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    transition: transform 0.6s ease-in-out;
  }

  .left-container {
    background-color: black;
    color: white;
    transform: ${({ isSignUp }) =>
    isSignUp ? "translateX(100%)" : "translateX(0)"};

    .slider-buttons {
      background-color: transparent;
      padding: 0.3rem 3rem;
      border-radius: 5px;
      border: 2px solid white;
      color: white;
      transition: all 0.2s ease;
    }

    .slider-buttons:hover {
      transform: scale(1.1);
    }
  }

  .right-container {
    background-color: #f0f0f0;
    transform: ${({ isSignUp }) =>
    isSignUp ? "translateX(-100%)" : "translateX(0)"};
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    span {
      align-self: flex-start;
      margin-bottom: 1rem;
      text-decoration: underline;
      font-size: small;
      cursor: pointer;
    }
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1.5px solid #ccc;
    border-radius: 4px;
  }

  input:hover {
    border: 1.5px solid #aaa;
  }

  input:focus {
    outline: none;
    border: 1.5px solid black;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 5.5rem;

    .container {
      flex-direction: column;
      width: 90%;
    }

    .left-container,
    .right-container {
      width: 100%;
      height: 50%;
    }

    /* Vertical sliding logic */
    .left-container {
      transform: ${({ isSignUp }) =>
    isSignUp ? "translateY(100%)" : "translateY(0)"};
    }

    .right-container {
      transform: ${({ isSignUp }) =>
    isSignUp ? "translateY(-100%)" : "translateY(0)"};
    }
  }
`;
