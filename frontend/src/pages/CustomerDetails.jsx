import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Spinner from "../components/Spinner";
import { registerUser } from "../api/authapis";



const CustomerDetails = () => {
    const navigate = useNavigate();

    const { cartData, getCartAmount, delivery_fee, allProducts, setCartData, backendUrl, buyData, checkUserExists, loginStatus, sessionId, setLoginStatus } = useContext(ShopContext);
    const [customerData, setCustomerData] = useState(() => {
        const savedData = localStorage.getItem("customer-shipping-details");
        return savedData ? JSON.parse(savedData) : {
            Name: "",
            email: "",
            password: "",
            country: "",
            address: "",
            apartment: "",
            city: "",
            state: "",
            pincode: "",
            phoneNumber: "",
        };
    });

    console.log(backendUrl)


    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isUserExists, setIsUserExists] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('')

    useEffect(() => {
        localStorage.setItem("customer-shipping-details", JSON.stringify(customerData));
    }, [customerData]);

    useEffect(() => {
        // Check if a valid email is present on page load
        if (customerData.email && validateEmail(customerData.email)) {
            handleCheckUserExists();
        }
    }, []);

    // validateEmail(customerData.email)
    useEffect(() => {
        console.log(customerData.email)
        const delayDebounce = setTimeout(() => {
            if (isEmailValid) {
                handleCheckUserExists();
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [customerData.email]);

    const validateEmail = (email) => {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsEmailValid(emailRegex.test(email));
        return emailRegex.test(email);
    };

    const handleCheckUserExists = async () => {
        setIsChecking(true);
        console.log(customerData.email)

        if (loginStatus === false) {
            try {
                const exists = await checkUserExists(customerData.email);
                setIsUserExists(exists);
            } catch (error) {
                console.error("Error checking user:", error);
                toast.error("Failed to check user.");
            } finally {
                setIsChecking(false);
            }
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setCustomerData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "email") {
            validateEmail(value);
            setIsUserExists(null);
        }
    };


    // console.log(buyData)

    const verifyRazorpay = (order) => {
        console.log(order.receipt)
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            image: logo,
            name: "Resolute & Rowe",
            description: "RazorPay Resolute & Rowe payment testing.",
            prefill: {
                name: `${customerData.Name}`,
                contact: `${customerData.phoneNumber}`,
            },
            theme: {
                color: '#daa520',
            },
            handler: async (response) => {
                const razorpayData = {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                    sessionId: sessionId,
                    receipt: order.receipt
                }
                try {
                    const { data } = await axios.post(
                        backendUrl + "api/order/verifyrazorpay",
                        razorpayData,
                        { withCredentials: true }
                    );
                    console.log(data);

                    if (data.success) {
                        setCartData({});
                        localStorage.removeItem('cart-items')
                        navigate("/");
                        if (!loginStatus && isUserExists === false) {
                            const data = {
                                name: customerData.Name,
                                email: customerData.email,
                                password: customerData.password
                            }
                            const response = await registerUser(data)
                            if (response.success) {
                                toast.success(response.message)
                                setLoginStatus(true)
                            }

                        }
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartData) {
                for (const item in cartData[items]) {
                    if (cartData[items][item] > 0) {
                        const itemInfo =
                            allProducts.find((product) => product._id === items)
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartData[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: customerData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                sessionId
            };



            // API calls according to payment method
            switch (paymentMethod) {
                case "cod":
                    const response = await axios.post(
                        backendUrl + "api/order/place",
                        orderData,
                        { withCredentials: true }
                    );
                    if (response.data.success) {
                        setCartData({});
                        localStorage.removeItem('cart-items')
                        navigate("/");
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                case "razorpay":
                    const responseRazorpay = await axios.post(
                        backendUrl + "api/order/razorpay",
                        orderData,
                        { withCredentials: true }
                    );
                    if (responseRazorpay.data.success) {
                        console.log()
                        verifyRazorpay(responseRazorpay.data.order);
                    }
                    break;
                default:
                    break;
            }

            if (!loginStatus && !isUserExists) {

            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    useEffect(() => {
        console.log(paymentMethod);
    }, [paymentMethod])

    return (
        <>
            <Navbar />
            <MainSection>
                <Container>
                    <Heading>Shipping Details</Heading>
                    <FormContainer>
                        <InputWrapper>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                name="Name"
                                value={customerData.Name}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="enter your email"
                                name="email"
                                value={customerData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {
                                loginStatus === false && isUserExists ? <>
                                    <span className="text-xs text-gray-500 ">user is already registered ! </span>
                                    <a className="underline text-blue-600 cursor-pointer text-sm  " onClick={() => navigate('/login', { state: true })}>Login</a>
                                    <span className="text-xs text-gray-500"> for order tracking</span>
                                </> : ''
                            }
                        </InputWrapper>

                        {
                            loginStatus === false && isUserExists !== null && !isUserExists ?
                                <InputWrapper>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="create a Password"
                                        name="password"
                                        value={customerData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </InputWrapper> : ''
                        }
                        <InputWrapper>
                            <Label>Country</Label>
                            <Input
                                type="text"
                                placeholder="Enter your country"
                                name="country"
                                value={customerData.country}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Address</Label>
                            <Input
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={customerData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Apartment</Label>
                            <Input
                                type="text"
                                placeholder="Enter apartment details (optional)"
                                name="apartment"
                                value={customerData.apartment}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>City</Label>
                            <Input
                                type="text"
                                placeholder="Enter your city"
                                name="city"
                                value={customerData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>State</Label>
                            <Input
                                type="text"
                                placeholder="Enter your state"
                                name="state"
                                value={customerData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Pincode</Label>
                            <Input
                                type="text"
                                placeholder="Enter your pincode"
                                name="pincode"
                                value={customerData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Phone Number</Label>
                            <Input
                                type="text"
                                placeholder="Enter your phone number"
                                name="phoneNumber"
                                value={customerData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                    </FormContainer>

                    <Button onClick={handleSubmit}>Continue to Payment</Button>
                </Container>
                {/* <CartSection>
                    <button>razorpay</button>
                </CartSection> */}
                <PaymentOptions>
                    <button onClick={() => setPaymentMethod("razorpay")}>razorpay</button>
                    <button onClick={() => setPaymentMethod("cod")}>cod</button>
                </PaymentOptions>
            </MainSection>
            <Footer />

        </>
    );
};

export default CustomerDetails;

const MainSection = styled.section`
  display: flex;
  height: auto;
`;

const Container = styled.div`
  width: 70%;
  height: max-content;
  margin: 40px auto;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartSection = styled.div`
  width: 30%;
  height: 100%;
  border-left: 1.5px solid gray;
  background-color: aliceblue;
`;

const PaymentOptions = styled.div`
  width: 40%;
  height: 100;
  background-color: aliceblue;
  display: flex;
  justify-content: space-around;
  align-items:center;
`;

const Heading = styled.h2`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const InputWrapper = styled.div`
  flex: 1 1 calc(50% - 20px);
  min-width: 280px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const totalAmount = styled.span`
  font-size: 18px;
  font-weight: 600;
  width: 100%;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
  margin-top: 20px;

  &:hover {
    background-color: #333;
  }
`;
