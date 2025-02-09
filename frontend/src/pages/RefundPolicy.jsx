import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PolicyWrapper } from '../wrappers/policy'


const RefundPolicy = () => {
    return (
        <>
            <Navbar />
            <PolicyWrapper>
                <h1>Refund and Return Policy</h1>
                <p>
                    At Resolute and Rowe, customer satisfaction is essential. If you’re not
                    completely happy with your purchase, you may return it within 7
                    business days of delivery for a full refund or exchange, subject to the
                    following conditions: <br /> <br />
                    1. Items must be unworn, unwashed, and in their original condition
                    with tags attached.  <br /> <br />
                    2. Sale or clearance items are non-refundable unless they arrive
                    damaged or defective. <br /> <br />
                    3. Customers are responsible for return shipping costs unless the
                    return is due to a defect or error on our part. <br /> <br />
                    4. Refunds will be issued to the original payment method within 7-10
                    business days after we receive the returned item. <br /> <br />
                    To initiate a return, please email us at resoluteandrowe@gmail.com
                    with your order number and reason for return.
                </p>
            </PolicyWrapper>
            <Footer />
        </>
    )
}

export default RefundPolicy

