import React from 'react'
import logo from '../assets/logo.png'
import { footer } from 'framer-motion/client'
import { FooterWrapper } from '../wrappers/footer'
import { useNavigate } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate()


    return (
        <FooterWrapper>
            <div className="social-media">
                <a className="">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                </a>
                <a className=" ">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                </a>
                <a className=" ">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="" viewBox="0 0 24 24">
                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                </a>
            </div>
            <div className="copywrite-links">
                <div className="copywrite-container">
                    <div className="copywrite"><span>© 2024 , resolute & rowe . All rights</span></div>
                    <div className="built-by">
                        <span className='flex items-center '>
                            Designed and built by -{" "}
                            <a
                                href="https://www.linkedin.com/in/rushikesh-vadnal-developer/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-link"
                            >
                                @rushikesh vadnal

                            </a>
                            <a
                                href="https://www.linkedin.com/in/rushikesh-vadnal-developer/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-link"
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        </span>
                    </div>                </div>
                <div className="footer-links">
                    <ul>
                        <li className=' cursor-pointer ' onClick={() => navigate('/policies/refund-policy')}>refund policy</li>
                        <li className=' cursor-pointer ' onClick={() => navigate('/policies/privacy-policy')}>privacy policy</li>
                        <li className=' cursor-pointer ' onClick={() => navigate('/policies/faq-policy')}>FAQ</li>
                        <li className=' cursor-pointer ' onClick={() => navigate('/policies/shipping-policy')}>shipping policy</li>
                        <li className=' cursor-pointer ' onClick={() => navigate('/contact')}>contact</li>
                    </ul>
                </div>
            </div>
        </FooterWrapper>
    )
}

export default Footer