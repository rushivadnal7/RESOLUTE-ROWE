import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LogoutUser } from '../api/authapis'
import { useNavigate } from "react-router-dom";
import { CheckLoginStatus } from "../api/authapis";
import { toast } from 'react-toastify'
import { ShopContext } from "../context/ShopContext";



const Account = () => {
  const navigate = useNavigate();
  const { loginStatus, fetchUserData, setCartData, setLoginStatus } = useContext(ShopContext);
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const checkUserLogin = async () => {
      const response = await CheckLoginStatus()
      if (response.loggedIn) {
        console.log(response)
        setUserName(response.userData.name)
        // setCartData(response.userData.cartData)
      }
      else {
        // setLoginStatus(false)
        toast.error('user not logged in')
      }
    }

    checkUserLogin()
  }, [])



  const handleLogout = async () => {
    try {
      await LogoutUser();
      setLoginStatus(false);
      setCartData({});
      fetchUserData(); // Reset state
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar />
      <AccountWrapper>
        <div className="left-container">
          <div className="account-details">
            <h2>Account Details</h2>
            <span className="block">{userName}</span>
          </div>
          <div className="account-logout">
            <span className='cursor-pointer' onClick={handleLogout}>logout</span>
          </div>
        </div>

        <div className="orders">
          <h3>Orders</h3>
        </div>
      </AccountWrapper>
      <Footer />
    </>
  );

}

export default Account

const AccountWrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;

    .left-container {
      width: 50%;
      display: flex;
      flex-direction: column; /* Stack children vertically */
    }

    .account-details {
      height: 50%;
      background-color: aliceblue;
    }

    .account-logout {
      height: 50%;
      background-color: lightyellow;
    }

    .orders {
      width: 50%;
      height: 100%;
      background-color: lightsalmon;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;

      .left-container, .orders {
        width: 100%;
      }

      .orders {
        height: auto;
      }
    }
`;
