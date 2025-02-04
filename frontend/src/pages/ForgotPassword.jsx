import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import { sendOTP } from '../api/otp'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const { checkUserExists } = useContext(ShopContext);

    const sendEmailHandler = async () => {
        if (email.length === 0) {
            return toast.info('enter email')
        }
        try {

            const response = await checkUserExists(email)
            if (response === true) {
                const data = await sendOTP(email)
                toast.success(data.message)

                if (data.success) {
                    navigate('/account/forgotpassword/verifyotp', { state: { email } })
                }

            } else {
                toast.info('enter a valid email id')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Navbar />
            <ForgotPasswordWrapper>
                <h2>Forgot password</h2>
                <div className="lock-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
                <span>Please enter your email to receive  a verification  code.</span>
                <div className="email-input">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
                </div>
                <Button onclick={sendEmailHandler} text={'send'} />

            </ForgotPasswordWrapper>
            <Footer/>
        </>
    )
}

const ForgotPasswordWrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    .lock-icon{
        width: 150px;
        margin: 1rem;
        height: 150px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        color:white;
    }
    span{
        margin: 2rem;
    }
    .email-input{
        margin-top: 2rem;
        margin-bottom: 4rem;

        label{
            display: block;
        }
        input{
            display: block;
            border: 1.5px solid black;
            padding: 0.3rem 1rem;
            border-radius: 5px;
        }

    }

`

export default ForgotPassword