import React, { useState } from 'react';
import styled from 'styled-components';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { sendOTP, verifyOTP } from '../api/otp';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const VerifyOtp = () => {
    const location = useLocation();
    const { email } = location.state;
    const navigate = useNavigate()
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Allow only one digit
        setOtp(newOtp);

        // Move to the next input automatically
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const verifyButtonHandler = async () => {
        const enteredOtp = otp.join("");
        console.log("Entered OTP:", enteredOtp);

        try {
            const response = await verifyOTP(email, enteredOtp)
            console.log(response)
            if (response.success) {
                toast.success(response.message)
                navigate('/account/forgotpassword/verifyotp/changepassword', { state: { email } })
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message || error)
        }

    };

    const resendOtpHandler = async () => {
        const data = await sendOTP(email)
        if (data.success) {
            toast.success(data.message)
        }
    }

    return (
        <>
            <Navbar />
            <VerifyOtpWrapper>
                <h2>Verify Your Email</h2>
                <div className="mail-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                    </svg>
                </div>
                <span>Please enter the 6-digit code sent to {email}.</span>

                <div className="otp-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength="1"
                            className="otp-box"
                        />
                    ))}
                </div>

                <Button onclick={verifyButtonHandler} text={'Verify'} />
                <p onClick={resendOtpHandler} className="resend-code">Resend Code</p>
            </VerifyOtpWrapper>
            <Footer />
        </>

    );
};

export default VerifyOtp;


const VerifyOtpWrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    .mail-icon {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        color: white;
        border-radius: 50%;
        margin: 1rem;
    }

    span {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    .otp-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 20px 0;
    }

    .otp-box {
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        text-align: center;
        border: 2px solid black;
        border-radius: 8px;
        outline: none;
        transition: 0.3s;
    }

    .otp-box:focus {
        border-color: black;
        box-shadow: #002147;
    }

    .resend-code {
        margin-top: 15px;
        color: #002147;
        cursor: pointer;
        text-decoration: underline;
    }
`;
