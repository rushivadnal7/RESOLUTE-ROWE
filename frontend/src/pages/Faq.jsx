import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PolicyWrapper } from '../wrappers/policy'


const Faq = () => {
    return (
        <>
            <Navbar />
            <PolicyWrapper>
                <h1>FAQ</h1>
                <p>
                    Q: How do I find the right size?
                    <br /> 
                    A: Check our detailed size chart on website to ensure the perfect fit.
                    <br /> <br />
                    Q: How should I care for my T-shirts? <br />
                    A: For best results, wash inside out in cold water and tumble dry on low.
                    Avoid bleach.
                    <br /> <br />
                    Q: Can I cancel or change my order? <br />
                    A: You may modify or cancel your order within 24 hours of placing it by
                    contacting us at resoluteandrowe@gmail.com .
                    <br /> <br />
                    Q: Do you offer custom designs? <br />
                    A: Yes! Contact us for bulk or personalized orders.
                    <br /> <br />
                    Q: What if I receive a damaged or incorrect item? <br />
                    A: Email us at resoluteandrowe@gmail.com with a photo of the item,
                    and we’ll resolve it promptly
                </p>
            </PolicyWrapper>
            <Footer />
        </>
    )
}

export default Faq