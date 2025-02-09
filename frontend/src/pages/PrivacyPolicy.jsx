import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PolicyWrapper } from '../wrappers/policy'


const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <PolicyWrapper>
                <h1>Privacy Policy</h1>
                <p>
                    At Resolute and Rowe, your privacy is our priority. We collect only the
                    information necessary to process your orders and enhance your
                    shopping experience. <br /> <br /> 
                    This includes your name, email address, shipping
                    address, and payment details. <br /> <br />
                    We do not share or sell your personal information to third parties. Data
                    is stored securely, and payment transactions are encrypted for your
                    safety. <br /> <br />
                    Our website uses cookies to improve functionality and provide you with
                    personalized experiences. By using our website, you agree to our use of
                    cookies. For more details, contact us at resoluteandrowe@gmail.com .
                </p>
            </PolicyWrapper>
            <Footer />
        </>
    )
}

export default PrivacyPolicy


