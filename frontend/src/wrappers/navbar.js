import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  width: 100vw;
  height: ${({ isScrolled }) => (isScrolled ? "4.5rem" : "5.5rem")};
  backdrop-filter: blur(40px);
  box-shadow: 0px 5px 20px black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  /* border-bottom: ${({ isScrolled }) =>
    isScrolled ? "1px solid white" : ""}; */

  background-color: ${({ isScrolled }) =>
    isScrolled ? "transparent" : "white"};
  color: ${({ isScrolled }) => (isScrolled ? "#40404F" : "black")};
  transition: background-color 0.3s ease;
  transition: height 0.3s ease;
  will-change: auto;

  ul {
    display: flex;
    gap: 2.5rem;
    li {
      cursor: pointer;
      text-align: center;
      font-size: small;
      transition: all 0.3s ease;
      will-change: all;
      text-transform: uppercase;
    }

    li:hover {
      scale: 1.05;
      color: #002147;
      filter: drop-shadow(0 -2mm 3mm gold);
    }
  }

  .logo {
    justify-self: center;
    width: 300px;
    height: 100%;
    display: flex;
    visibility: visible;
    cursor: grab;
  }

  .nav-buttons {
    display: flex;
    position: relative;
    gap: 2rem;
  }

  .button {
    transition: all 0.3s ease-in;
    will-change: auto;
  }

  .nav-buttons .button:hover {
    scale: 1.05;
    color: #002147;
    filter: drop-shadow(0 -1mm 4mm gold);
  }

  .hamburger-menu {
    display: none;
  }

  .hamburger {
    color: ${({ isScrolled }) => (isScrolled ? "#40404F" : "black")};
  }

  .dropdown-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-self: center;
    padding: 1rem;
    top: 120%;
    right: 50%;
    background-color: whitesmoke;
    /* box-shadow: 3px 3px 15px black; */
    filter: drop-shadow(0 -2mm 4mm whitesmoke);
    border-radius: 5px;
    width: 100px;
    max-height: 0px;
    transition: max-height 0.3s ease;
    will-change: auto;

    .orders-button,
    .auth-button {
      cursor: pointer;
    }

    .hover-effect:hover {
      color: #002147;
      filter: drop-shadow(0 -1mm 4mm #fcf6ba);
    }
  }

  .menu {
    display: none;
  }

  .dropdown-container.open {
    max-height: 100px;
  }
  .dropdown-container.close {
    max-height: 0px;
    visibility: hidden;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    justify-content: space-between;
    padding: 0 1rem ;

    .hamburger-menu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 0.3rem;
      cursor: pointer;
      width: 1.7rem;
      color: black;
      /* background-color:black; */

      .menu-bar {
        background-color: gray;
        width: 20px;
        height: 3px;
        border-radius: 8px;
      }
    }
    .menu {
      /* background-color: #1b2a41; */
      display: flex;
      flex-direction: column;
      background-color: black;
      width: 50%;
      height: 100vh;
      position: absolute;
      top: ${({ isScrolled }) => (isScrolled ? "4.5rem" : "5.5rem")};
      left: -100%;
      z-index: 10;
      transition: all 0.4s ease;
      will-change: auto;

      ul {
        margin-top: 5rem;
        list-style: none;
        display: flex;
        flex-direction: column;

        gap: 1rem;
        color: white;
      }
    }

    .open {
      left: 0;
    }

    .close {
      left: -100%;
    }

    .nav-links {
      display: none;
    }

    .logo {
      display: none;
      visibility: hidden;
      cursor: pointer;
    }
  }

  .cart-button {
    position: relative;
  }
  .cart-count {
    width: 15px;
    text-align: center;
    height: 15px;
    position: absolute;
    bottom: 0%;
    right: -20%;
    font-size: xx-small;
    background-color: black;
    color: white;
    border-radius: 50%;
  }
`;
