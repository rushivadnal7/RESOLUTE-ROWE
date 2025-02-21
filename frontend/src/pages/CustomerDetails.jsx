import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { registerUser } from "../api/authapis";
import Spinner from "../components/Spinner";
import { createOrder } from "../api/delhiveryapi";



const CustomerDetails = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const buyData = location.state

    const {
        cartData,
        getCartAmount,
        delivery_fee,
        allProducts,
        setCartData,
        backendUrl,
        // buyData,
        checkUserExists,
        loginStatus,
        sessionId,
        setLoginStatus,
        currency,
        discountPrice,
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
                // apartment: "",
                city: "",
                state: "",
                pincode: "",
                phoneNumber: "",
            };
    });
    const customerCartData = [];




    for (const items in cartData) {
        for (const item in cartData[items]) {
            if (cartData[items][item] > 0) {
                const itemInfo = allProducts.find(
                    (product) => product._id === items
                );

                if (itemInfo) {  // Ensure itemInfo is found before using it
                    customerCartData.push({
                        name: itemInfo.name,
                        price: itemInfo.price,
                        size: item, // Assigning size correctly
                        image: itemInfo.images[0],
                        quantity: cartData[items][item]
                    });
                }
            }
        }
    }

    const [couponCode, setCouponCode] = useState("");
    const [discountedRate, setDiscountedRate] = useState(0);
    const [discount, setDiscount] = useState("no discount");
    const [couponPlaceholder, setCouponPlaceholder] = useState("discount code");
    const [couponLoading, setCouponLoading] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isUserExists, setIsUserExists] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [directBuy, setDirectBuy] = useState(
        buyData?.length > 0 ? true : false
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
                const response = await checkUserExists(customerData.email);
                console.log('response and status', response.message, response.success)
                setIsUserExists(response.exists);
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
        console.log(order);
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
                        backendUrl + "/api/order/verifyrazorpay",
                        razorpayData,
                        { withCredentials: true }
                    );
                    console.log(data);

                    if (data.success) {
                        if (!directBuy) {
                            setCartData({});
                            localStorage.removeItem("cart-items");
                        }
                        // console.log()
                        // let createDelhiveryData = {
                        //     // orderId: order.receipt,
                        //     // name: customerData.Name,
                        //     // phone: customerData.phoneNumber,
                        //     // address: customerData.address,
                        //     // pin: customerData.pincode,
                        //     // state: customerData.state,
                        //     // city: customerData.city,
                        //     // weight: '1kg'
                        //     expected_package_count : 7,

                        // }

                        // const delhiveryResponse = await createOrder(createDelhiveryData)
                        // console.log(delhiveryResponse.data)

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

        if (
            (!isUserExists || isUserExists === null && customerData.password.length === 0) || 
            customerData.Name.length === 0 || 
            customerData.email.length === 0 || 
            customerData.address.length === 0 || 
            customerData.country.length === 0 || 
            customerData.city.length === 0 || 
            customerData.state.length === 0 || 
            customerData.pincode.length === 0 || 
            customerData.phoneNumber.length === 0
          ) {
            console.log("Please fill all the fields")
            return toast.error("Please fill all the fields");
          }
          

        try {
            let orderItems = [];

            if (directBuy) {
                // console.log(buyData_productId);
                const itemInfo = allProducts.find(
                    (product) => product._id === buyData[0].productID
                );
                itemInfo.size = buyData[0].size;
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
            let orderData = {
                address: customerData,
                items: orderItems,
                amount: directBuy ? discountPrice > 0 ? discountPrice : buyData[0].price : getCartAmount(),
                sessionId,
            };

            // API calls according to payment method
            switch (paymentMethod) {
                case "cod":
                    const response = await axios.post(
                        backendUrl + "/api/order/place",
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
                        backendUrl + "/api/order/razorpay",
                        orderData,
                        { withCredentials: true }
                    );
                    if (responseRazorpay.data.success) {
                        console.log('line 305 console log', responseRazorpay.data.order)
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




    console.log(isUserExists, loginStatus)


    return (
        <>
            <Navbar />
            <MainSection>
                <div className="mobile-view-summary-header">
                    <h2>Order Summary</h2>
                    <span>{`${currency} ${buyData ? buyData[0]?.price : getCartAmount()
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
                        {/* <InputWrapper>
                            <Label>Apartment</Label>
                            <Input
                                type="text"
                                placeholder="Enter apartment details (optional)"
                                name="apartment"
                                value={customerData.apartment}
                                onChange={handleInputChange}
                            />
                        </InputWrapper> */}
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
                    {directBuy ? <Button onClick={handleSubmit}>Pay now</Button> : ''}
                </Container>
                <PaymentOptions>

                    {
                        directBuy ?
                            <DirectBuyProduct data={buyData} couponLoading={couponLoading} couponPlaceholder={couponPlaceholder} discount={discount} setCouponCode={setCouponCode} />
                            :
                            <div className="item-details itemd-details-col">

                                {/* <div className="products-container">

                                    {customerCartData.map((product, index) => {
                                        const { image, name, size, price, discountedRate } = product;

                                        return (
                                            <div className="product" key={index}>
                                                <img src={image} alt={name} />
                                                <div className="details">
                                                    <div className="name">{name}</div>
                                                    <div className="size">Size: {size}</div>
                                                </div>
                                                <div className="price">
                                                    ₹{discountedRate ? discountedRate.toFixed(2) : price.toFixed(2)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="price-details">
                                    <div className="label">Subtotal</div>
                                    <div className="value">
                                        ₹{discountedRate ? discountedRate : getCartAmount()}
                                    </div>
                                </div>
                                <div className="discount-code">
                                    <input
                                        type="text"
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder={couponPlaceholder}
                                    />
                                    <button onClick={couponApply}>Apply</button>
                                </div> */}
                                <div className="price-details">
                                    <div className="label">Shipping</div>
                                    <div className="value">Enter shipping address</div>
                                </div>
                                <div className="total">
                                    Total: ₹ {discountedRate ? discountedRate : getCartAmount()}</div>
                                {couponLoading ? <Spinner size={20} /> : <p>{discount}</p>}

                                {/* <div className="taxes">
                                    Including ₹{(getCartAmount() * 0.05).toFixed(2)} in taxes
                                </div> */}
                                <Button onClick={handleSubmit}>Pay now</Button>
                            </div>
                    }

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

const DirectBuyProduct = ({ data }) => {
    const [couponCode, setCouponCode] = useState("");
    // const [discountPrice, setDiscountedRate] = useState(0);
    const [discount, setDiscount] = useState("no discount");
    const [couponPlaceholder, setCouponPlaceholder] = useState("discount code");
    const [couponLoading, setCouponLoading] = useState(false);
    // console.log("Received discountPrice in DirectBuyProduct:", discountPrice);

    const { setDiscountPrice, discountPrice } = useContext(ShopContext);


    const couponApply = () => {
        setCouponLoading(true);
        setTimeout(() => {
            if (couponCode === "TOP10") {
                const newDiscountedRate = data
                    ? data[0].price - (data[0].price * 25) / 100
                    : getCartAmount() - (getCartAmount() * 25) / 100;

                console.log("Updating discountPrice to:", newDiscountedRate); // Debugging
                setDiscountPrice(newDiscountedRate)
                setDiscount("25% discount applied!");
            } else {
                setCouponCode("");
                setCouponPlaceholder("No discounts available");
                setDiscount("Invalid Coupon Code");
            }
            setCouponLoading(false);
        }, 500);
    };

    return (
        <div className="item-details">
            <div className="product">
                <img src={data[0].img} alt={data[0].img} />
                <div className="details">
                    <div className="name">{data[0].name}</div>
                    <div className="size">Size: {data[0].size}</div>
                </div>
                <div className="price">
                    ₹{discountPrice ? discountPrice : data[0].price.toFixed(2)}
                </div>
            </div>
            <div className="price-details">
                <div className="label">Subtotal</div>
                <div className="value">
                    ₹{discountPrice ? discountPrice : data[0].price.toFixed(2)}
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
            Total: ₹ {discountPrice ? discountPrice : data[0].price.toFixed(2)}
            {couponLoading ? <Spinner size={20} /> : <p>{discount}</p>}
            {/* <div className="taxes">
                Including ₹{(data[0].price * 0.05).toFixed(2)} in taxes
            </div> */}
        </div>
    )
}

const MainSection = styled.section`
  display: flex;
  height: 100vh;
  margin-top: 5.5rem;


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
  /* margin: 40px auto; */
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* overflow-y: scroll; */

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
  /* padding: 1rem; */
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  .item-details {
    height: 100%;
    display: flex;
    /* margin: 2rem; */
    flex-direction: column;
    gap: 16px;
    background-color: #f9f9f9;
    padding: 16px;
    width: 100%;

    .products-container{
        display: flex;
        flex-direction: column;
        height: 30%;
    }

    .product {
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 16px;
      width: 100%;
      height: 5rem;
      
      img {
          width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        padding: 10px;
      }

      .details {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 14px;
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
      display: inline;
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
  /* margin-bottom: 20px; */
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
