import React, { useState, useEffect, useContext } from "react";
import Logo3D from "./Logo3D";
import { NavbarWrapper } from "../wrappers/navbar";
import { useNavigate } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartData, loginStatus, fetchUserData } = useContext(ShopContext);

  const getCartCount = () => {
    let totalCount = 0;
    // console.log(cartData)
    for (const itemId in cartData) {
      // console.log(itemId)
      if (cartData[itemId]) {
        for (const size in cartData[itemId]) {
          const count = cartData[itemId][size];
          if (typeof count === "number" && count > 0) {
            totalCount += count;
          }
        }
      }
    }
    return totalCount;
  };

  useEffect(() => {
    fetchUserData()
  }, [])

  const value = getCartCount()
  // console.log(value)


  const menuDrawerHandler = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Change this scroll threshold as per your requirement (e.g., 100px)
      if (scrollTop > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const UserButtonHandler = () => {
    if (loginStatus === true) {
      navigate('/account')
    } else {
      navigate('/account/login')
    }
  }



  return (
    <>

      <NavbarWrapper isScrolled={isScrolled}>
        <div
          className={`hamburger-menu ${hamburgerMenu ? "clicked" : "unclicked"}`}
          onClick={menuDrawerHandler}
        >
          {
            hamburgerMenu ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          }

          {/* <div className="menu-bar menu-bar-top"></div>
          <div className="menu-bar menu-bar-middle"></div>
          <div className="menu-bar menu-bar-bottom"></div> */}
        </div>

        <div className={`menu ${hamburgerMenu === true ? "open" : "close"}`}>
          <ul>
            <li onClick={() => navigate('/')}>home</li>
            <li onClick={() => navigate('/products')}>products</li>
            <li onClick={() => navigate('/customize')}>customize</li>
            <li onClick={() => navigate('/contact')}>contact</li>
          </ul>
        </div>

        <div className="nav-links">
          <ul>
            <li className="link" onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/products')} className="link">Products</li>
            <li onClick={() => navigate('/customize')} className="link">customize</li>
            <li onClick={() => navigate('/contact')} className="link">Contact</li>
          </ul>
        </div>
        <div className="logo">
          <Logo3D />
        </div>
        <div className="nav-buttons">
          <div onClick={UserButtonHandler} className="auth-button button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <div onClick={() => navigate('/cart')} className="cart-button button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span className={`cart-count cursor-pointer ${value > 0 ? '' : 'hidden'}`}>{getCartCount()}</span>
          </div>
        </div>
      </NavbarWrapper>
    </>
  );
};

export default Navbar;
