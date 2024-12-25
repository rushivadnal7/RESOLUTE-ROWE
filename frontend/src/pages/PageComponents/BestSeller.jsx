import React from "react";
import bestSellerImage from "../../assets/majesty.png";
import razorpay from "../../assets/upi_color_card.svg";
import Gpay from "../../assets/googlepay_color_card.svg";
import BorderButton from "../../components/BorderButton";
import Button from "../../components/Button";



const BestSeller = () => {
  return (
    <section
      // data-scroll
      // data-scroll-section
      // data-scroll-speed="-.2"
      className="best-seller-page"
    >
      <h1>BEST SELLER</h1>
      <div className="product-container">
        <div className="product-display">
          <div className="product-image">
            <img src={bestSellerImage} alt="best-seller-image" />
          </div>
        </div>
        <div className="product-details">
          <div className="information">
            <h2 className="branding">Resolute & Rowe</h2>
            <span className="product-title">Don't Imagine , Believe</span>
            <span className="pricing">Rs. 599</span>
          </div>
          <div className="payment-gateway">
            <h2>secure Checkout with</h2>
            <div className="gateway-options">
              <div className="razorpay">
                <img src={razorpay} alt="razorpay" />
              </div>
              <div className="gpay">
                <img src={Gpay} alt="gpay" />
              </div>
            </div>
          </div>
          <div className="buy-addtocart-buttons">
            {/* <button className="buy-button">Buy</button> */}
            <BorderButton  text={'buy'} bgColor={'white'}/>
            <Button text={'add to cart'}/>
            {/* <button className="add-to-cart-button">Add to cart</button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
