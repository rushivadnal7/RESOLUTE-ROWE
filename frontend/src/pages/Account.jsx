import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LogoutUser } from '../api/authapis'
import { useNavigate } from "react-router-dom";
import { CheckLoginStatus } from "../api/authapis";
import { toast } from 'react-toastify'
import { ShopContext } from "../context/ShopContext";

const AccountWrapper = styled.section`
    width: 100VW;
    height: 100VH;


`

const Account = () => {
  const navigate = useNavigate();
  const { loginStatus, fetchUserData, setCartData, setLoginStatus } = useContext(ShopContext);
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const checkUserLogin = async () => {
      const response = await CheckLoginStatus()
      if (response.loggedIn) {

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
        <h1>Account Page</h1>
        <span className="block">{userName}</span>
        <span className='cursor-pointer' onClick={handleLogout}>logout</span>
      </AccountWrapper>
      <Footer />
    </>
  )
}

export default Account