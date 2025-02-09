import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PolicyWrapper } from '../wrappers/policy'

const ShippingPolicy = () => {
    return (
        <>
            <Navbar />
            <PolicyWrapper>
                <h1>Shipping Policy</h1>
                <p>
                    We strive to deliver your Resolute and Rowe items promptly and safely.
                    <br /> <br />
                    1. Processing Time: Orders are processed within 1-3 business days.
                    <br /> <br />
                    2. Shipping Times:
                    o Domestic: 3-7 business days
                    o International: 7-21 business days (varies by location)
                    <br /> <br />
                    3. Shipping Costs: Calculated at checkout based on your location and
                    preferred shipping method.
                    <br /> <br />
                    4. Lost or Delayed Shipments: If your package is lost or delayed,
                    contact us at resoluteandrowe@gmail.com , and we’ll work to
                    resolve the issue promptly.
                    <br /> <br />
                    Terms and Conditions
                    By using the Resolute and Rowe website or purchasing our products,
                    you agree to the following terms:
                    <br /> <br />
                    1. Intellectual Property: All designs, images, and content are the
                    property of Resolute and Rowe and may not be reproduced
                    without permission.
                    <br /> <br />
                    2. Prohibited Use: You agree not to misuse our website, including
                    engaging in fraudulent activities or spreading malware.
                    <br /> <br />
                    3. Liability Disclaimer: We are not responsible for damages or losses
                    resulting from the use of our products beyond their intended
                    purpose.
                    <br /> <br />
                    For questions about these terms, contact us at
                    resoluteandrowe@gmail.com .
                </p>
            </PolicyWrapper>
            <Footer />
        </>
    )
}

export default ShippingPolicy