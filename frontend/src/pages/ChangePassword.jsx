import React, { useState } from "react";
import styled from "styled-components";
import {  useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { sendOTP, verifyOTP } from "../api/otp";
import { toast } from "react-toastify";
import { ResetPassword } from "../api/authapis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChangePassword = () => {
    const location = useLocation();
    const { email } = location.state;
    const navigate = useNavigate()
    const [newPassword, setNewpassword] = useState('')
    const [confirmPassword, setConfirmpassword] = useState('')

    const changeButtonHandler = async () => {
        console.log(newPassword)
        console.log(confirmPassword)

        if(newPassword === confirmPassword){
            try {
                const response = await ResetPassword(email, newPassword);
                console.log(response.success)
                toast.success(response.message)
                if(response.success){
                    return navigate('/account/login')
                }
            } catch (error) {
                toast.error(error.message || error)
            }
        }else{
            toast.info('Passwords do not match')
        }
    };

    return (
        <>
            <Navbar/>
            <ChangePasswordWrapper>
                <h2>Create New Password</h2>
                <div className="unlock-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                    </svg>
                </div>
                <span>Change your {email} Password.</span>

                <div className="newpassword-input">
                    <label htmlFor="password">new password</label>
                    <input onChange={(e) => setNewpassword(e.target.value)} type="password" name="password" id="password" />
                </div>
                <div className="confirmpassword-input">
                    <label htmlFor="password">confirm password</label>
                    <input onChange={(e) => setConfirmpassword(e.target.value)} type="password" name="password" id="password" />
                </div>

                <Button onclick={changeButtonHandler} text={"change"} />
            </ChangePasswordWrapper>
            <Footer/>
        </>
    );
};

export default ChangePassword;

const ChangePasswordWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .unlock-icon {
    width: 150px;
    margin: 1rem;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
  }
  span {
    margin: 2rem;
  }
  .newpassword-input {
    margin: 1rem;

    label {
      display: block;
    }
    input {
      display: block;
      border: 1.5px solid black;
      padding: 0.3rem 1rem;
      border-radius: 5px;
    }
  }
  .confirmpassword-input {
    margin: 1rem;

    label {
      display: block;
    }
    input {
      display: block;
      border: 1.5px solid black;
      padding: 0.3rem 1rem;
      border-radius: 5px;
    }
  }
`;
