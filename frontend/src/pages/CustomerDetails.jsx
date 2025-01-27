import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { registerUser } from "../api/authapis";
// import { CartItem, CartItems, QuantitySelector } from "../wrappers/cart";
import BorderButton from "../components/BorderButton";
// import Button from "../components/Button";
import Spinner from "../components/Spinner";

const CustomerDetails = () => {
    const navigate = useNavigate();

    const {
        cartData,
        getCartAmount,
        delivery_fee,
        allProducts,
        setCartData,
        backendUrl,
        buyData,
        checkUserExists,
        loginStatus,
        sessionId,
        setLoginStatus,
        currency,
    } = useContext(ShopContext);
    const [customerData, setCustomerData] = useState(() => {
        const savedData = localStorage.getItem("customer-shipping-details");
        return savedData
            ? JSON.parse(savedData)
            : {
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

    useEffect(() => {
        if (Object.keys(buyData).length > 0) {
            localStorage.setItem("buy-data", JSON.stringify(buyData));
        }
    }, []);

    const data = localStorage.getItem("buy-data");

    let parsedBuyData = JSON.parse(data);

    const { img, name, size, price, productID } = parsedBuyData[0];

    const [couponCode, setCouponCode] = useState("");
    const [discountedRate, setDiscountedRate] = useState(null);
    const [discount, setDiscount] = useState("no discount");
    const [couponPlaceholder, setCouponPlaceholder] = useState("discount code");
    const [couponLoading, setCouponLoading] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isUserExists, setIsUserExists] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [directBuy, setDirectBuy] = useState(
        parsedBuyData.length > 0 ? true : false
    );

    useEffect(() => {
        localStorage.setItem(
            "customer-shipping-details",
            JSON.stringify(customerData)
        );
    }, [customerData]);

    useEffect(() => {
        // Check if a valid email is present on page load
        if (customerData.email && validateEmail(customerData.email)) {
            handleCheckUserExists();
        }
    }, []);

    // validateEmail(customerData.email)
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (isEmailValid) {
                handleCheckUserExists();
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [customerData.email]);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsEmailValid(emailRegex.test(email));
        return emailRegex.test(email);
    };

    const handleCheckUserExists = async () => {
        setIsChecking(true);

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

    const verifyRazorpay = (order) => {
        console.log(order.receipt);
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
                color: "#daa520",
            },
            handler: async (response) => {
                const razorpayData = {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                    sessionId: sessionId,
                    receipt: order.receipt,
                };
                try {
                    const { data } = await axios.post(
                        backendUrl + "api/order/verifyrazorpay",
                        razorpayData,
                        { withCredentials: true }
                    );
                    console.log(data);

                    if (data.success) {
                        if (!directBuy) {
                            setCartData({});
                            localStorage.removeItem("cart-items");
                        }
                        navigate("/");
                        if (!loginStatus && isUserExists === false) {
                            const data = {
                                name: customerData.Name,
                                email: customerData.email,
                                password: customerData.password,
                            };
                            const response = await registerUser(data);
                            if (response.success) {
                                toast.success(response.message);
                                setLoginStatus(true);
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];

            if (directBuy) {
                console.log(productID);
                const itemInfo = allProducts.find(
                    (product) => product._id === productID
                );
                itemInfo.size = size;
                itemInfo.quantity = 1;
                orderItems.push(itemInfo);
            } else {
                for (const items in cartData) {
                    for (const item in cartData[items]) {
                        if (cartData[items][item] > 0) {
                            const itemInfo = allProducts.find(
                                (product) => product._id === items
                            );
                            if (itemInfo) {
                                itemInfo.size = item;
                                itemInfo.quantity = cartData[items][item];
                                orderItems.push(itemInfo);
                            }
                        }
                    }
                }
            }
            console.log(orderItems);
            let orderData = {
                address: customerData,
                items: orderItems,
                amount: directBuy
                    ? discountedRate
                        ? discountedRate + delivery_fee
                        : price + delivery_fee
                    : getCartAmount() + delivery_fee,
                sessionId,
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
                        if (!directBuy) {
                            setCartData({});
                            localStorage.removeItem("cart-items");
                        }
                        if (!loginStatus && isUserExists === false) {
                            const data = {
                                name: customerData.Name,
                                email: customerData.email,
                                password: customerData.password,
                            };
                            const response = await registerUser(data);
                            if (response.success) {
                                toast.success(response.message);
                                setLoginStatus(true);
                            }
                            navigate("/");
                        }
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

    const couponApply = () => {
        setCouponLoading(true);
        setTimeout(() => {
            if (couponCode === "TOP10") {
                setDiscountedRate(price - (price * 25) / 100);
                setDiscount("25%");
            } else {
                setCouponCode("");
                setCouponPlaceholder("no discounts available");
            }
            setCouponLoading(false);
        }, 500);
    };

    return (
        <>
            <Navbar />
            <MainSection>
                <div className="mobile-view-summary-header">
                    <h2>Order Summary</h2>
                    <span>{`${currency} ${parsedBuyData ? price : getCartAmount()
                        }`}</span>
                </div>
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
                            {loginStatus === false && isUserExists ? (
                                <>
                                    <span className="text-xs text-gray-500 ">
                                        user is already registered !{" "}
                                    </span>
                                    <a
                                        className="underline text-blue-600 cursor-pointer text-sm  "
                                        onClick={() => navigate("/login", { state: true })}
                                    >
                                        Login
                                    </a>
                                    <span className="text-xs text-gray-500">
                                        {" "}
                                        for order tracking
                                    </span>
                                </>
                            ) : (
                                ""
                            )}
                        </InputWrapper>

                        {loginStatus === false && isUserExists !== null && !isUserExists ? (
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
                            </InputWrapper>
                        ) : (
                            ""
                        )}
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

                    <Button onClick={handleSubmit}>Paynow</Button>
                </Container>
                <PaymentOptions>
                    <div className="item-details">
                        <div className="product">
                            <img src={img} alt={name} />
                            <div className="details">
                                <div className="name">{name}</div>
                                <div className="size">Size: {size}</div>
                            </div>
                            <div className="price">
                                ₹{discountedRate ? discountedRate : price.toFixed(2)}
                            </div>
                        </div>
                        <div className="price-details">
                            <div className="label">Subtotal</div>
                            <div className="value">
                                ₹{discountedRate ? discountedRate : price.toFixed(2)}
                            </div>
                        </div>
                        <div className="discount-code">
                            <input
                                type="text"
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder={couponPlaceholder}
                            />
                            <button onClick={couponApply}>Apply</button>
                        </div>
                        <div className="price-details">
                            <div className="label">Shipping</div>
                            <div className="value">Enter shipping address</div>
                        </div>
                        <div className="total"></div>
                        Total: ₹ {discountedRate ? discountedRate : price.toFixed(2)}
                        {couponLoading ? <Spinner size={20} /> : <p>{discount}</p>}
                        <div className="taxes">
                            Including ₹{(price * 0.05).toFixed(2)} in taxes
                        </div>
                    </div>
                    <div className="payment-options">
                        {/* <Button
                            onClick={() => setPaymentMethod("razorpay")}
                            text={"razorpay"}
                        />
                        <input type="checkbox" name="" id="" />

                        <Button onClick={() => setPaymentMethod("cod")} text={"cod"} /> */}
                    </div>
                </PaymentOptions>
                <MobileViewButton onClick={handleSubmit}>
                    Paynow
                </MobileViewButton>
            </MainSection>
            <Footer />
        </>
    );
};

export default CustomerDetails;

const MainSection = styled.section`
  display: flex;
  height: 100vh;

  .mobile-view-summary-header {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 5.5rem;
    flex-direction: column;
    height: max-content;

    .mobile-view-summary-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid gainsboro;
    }
  }
`;

const Container = styled.div`
  width: 70%;
  /* height: max-content; */
  margin: 40px auto;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: max-content;
    padding: 1.5rem;
    /* position: st; */
    /* overflow-y: hidden; */
  }
`;

const PaymentOptions = styled.div`
  width: 40%;
  padding: 1rem;
  height: 100%;
  background-color: whitesmoke;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  .item-details {
    /* height: 80%; */
    display: flex;
    margin: 2rem;
    flex-direction: column;
    gap: 16px;
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 8px;

    .product {
      display: flex;
      align-items: center;
      gap: 16px;

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
      }

      .details {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .size {
          font-size: 14px;
          color: #666;
        }
      }
    }

    .price-details {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 14px;
        color: #555;
      }

      .value {
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }
    }

    .discount-code {
      display: flex;
      align-items: center;
      gap: 8px;

      input {
        flex: 1;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      button {
        padding: 8px 16px;
        font-size: 14px;
        color: #fff;
        background-color: black;
        border: none;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }
      }
    }

    .total {
      font-size: 16px;
      font-weight: bold;
      color: #000;
      margin-top: 16px;
    }

    .taxes {
      font-size: 12px;
      color: #666;
    }
  }

  .payment-options {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* border: 1px solid red; */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: max-content;
    background-color: white;
  }
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
  /* overflow-y: scroll; */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: max-content;
    /* overflow-y: hidden; */
  }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

`;

const MobileViewButton = styled.button`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    background-color: #000;
    color: #fff;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: center;
    margin: 20px;
  }
`;
