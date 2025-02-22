import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { LoginWrapper } from '../wrappers/login';
import Button from '../components/Button';
import { LoginUser, registerUser } from '../api/authapis';
import { toast } from 'react-toastify'

import { useLocation, useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/adminapi';
import { ShopContext } from '../context/ShopContext';
import { addCartDataLStrgToDb, UserCart } from '../api/cartapi';




const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const location = useLocation();
  const customerDetailsLogin = location.state;

  const navigate = useNavigate()
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const { cartData, setLoginStatus } = useContext(ShopContext)


  const [message, setMessage] = useState('')
  console.log(cartData)

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(signupFormData);
      if (data.success) {
        toast.success(data.message)
        if (customerDetailsLogin === true) {
          navigate('/cart/customerdetails');
        } else {
          navigate('/')
        }
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      setMessage(error)
    }
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loginFormData.email === 'admin@gmail.com' && loginFormData.password === 'adminPassword') {
      const data = {
        email: loginFormData.email,
        password: loginFormData.password,
      };
      const response = await adminLogin(data);
      if (response.success) {
        navigate('/admin'); // Navigate directly to the admin page
        toast.success('Welcome ADMIN');
        return;
      } else {
        toast.error('Invalid Email or Password');
      }
    }
    const data = await LoginUser(loginFormData);
    console.log(data.token)
    if (data.success) {
      const response = await addCartDataLStrgToDb(cartData);
      if (response.success) {
        console.log('data added to db from local storage')
      }
      if (customerDetailsLogin === true) {
        navigate('/cart/customerdetails');
      } else {
        toast.success(data.message)
        navigate('/')
      }
      setLoginStatus(true)
    } else {
      toast.error(data.message);
    }
  }

  const handleToggle = () => {
    setIsSignUp(prevState => !prevState);
  };

  

  return (
    <>

      <Navbar />
      <LoginWrapper isSignUp={isSignUp}>
        <div className="container">
          <div className="left-container">
            {isSignUp ? (
              <>
                <h2>Hello, User!</h2>
                <p>Already a user? </p>

                <button className='slider-buttons' onClick={handleToggle}>login</button>
              </>
            ) : (
              <>
                <h2>Welcome Back!</h2>
                <p>New to Resolute and Rowe? </p>
                <button className='slider-buttons' onClick={handleToggle}>signup</button>
              </>
            )}
          </div>
          <div className="right-container">
            {isSignUp ? (
              <form onSubmit={handleSignupSubmit} className="form">
                <h2>Sign Up</h2>
                <input
                  value={signupFormData.name}
                  onChange={(e) => setSignupFormData({
                    ...signupFormData,
                    name: e.target.value
                  })}
                  type="text" placeholder="Full name" />

                <input
                  value={signupFormData.email}
                  onChange={(e) => setSignupFormData({
                    ...signupFormData,
                    email: e.target.value
                  })}
                  type="email" placeholder="Email" />

                <input
                  value={signupFormData.password}
                  onChange={(e) => setSignupFormData({
                    ...signupFormData,
                    password: e.target.value
                  })}
                  type="password" placeholder="Password" />
                <Button submit='submit' text={'signup'} />
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="form">
                <h2>Login</h2>
                <input
                  value={loginFormData.email}
                  onChange={(e) => setLoginFormData({
                    ...loginFormData,
                    email: e.target.value
                  })}
                  type="email" placeholder="Email" />

                <input
                  value={loginFormData.password}
                  onChange={(e) => setLoginFormData({
                    ...loginFormData,
                    password: e.target.value
                  })}
                  type="password" placeholder="Password" />
                <span onClick={() => {navigate('/account/forgotpassword')}}>forgot password?</span>
                <Button submit={'submit'} text={'login'} />
              </form>
            )}
          </div>
        </div>
      </LoginWrapper>
      <Footer />
    </>
  );
};

export default Login;
