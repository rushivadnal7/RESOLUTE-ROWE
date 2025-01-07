import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopContext } from "../context/ShopContext";

const CustomerDetails = () => {

    const {cartData} = useContext(ShopContext);   

    const [customerData, setCustomerData] = useState({
        firstName: "",
        lastName: "",
        country: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        pincode: "",
        phoneNumber: "",
    });
    // console.log(cartItems);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const requiredFields = [
            "firstName",
            "lastName",
            "country",
            "address",
            "city",
            "state",
            "pincode",
            "phoneNumber",
        ];
        const missingFields = requiredFields.filter(
            (field) => !customerData[field]
        );

        if (missingFields.length > 0) {
            toast.error(
                `Please fill the following fields: ${missingFields.join(", ")}`
            );
        } else {
            console.log(customerData);
        }
    };

    return (
        <>
            <Navbar />
            <MainSection>
                <Container>
                    <Heading>Shipping Details</Heading>
                    <FormContainer>
                        <InputWrapper>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter your first name"
                                name="firstName"
                                value={customerData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter your last name"
                                name="lastName"
                                value={customerData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
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
                    <button>razorpay</button>
                </PaymentOptions>
            </MainSection>
            <Footer />

        </>
    );
};

export default CustomerDetails;

const MainSection = styled.section`
  display: flex;
  height: 100vh;
`;

const Container = styled.div`
  width: 70%;
  height: 100%;
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
  height: 100%;
  background-color: aliceblue;
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
