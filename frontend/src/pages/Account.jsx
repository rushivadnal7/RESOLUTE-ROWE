import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LogoutUser } from "../api/authapis";
import { useNavigate } from "react-router-dom";
import { CheckLoginStatus } from "../api/authapis";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Order = ({ item }) => {
  console.log(item);
  return (
    <>
      <OrderWrapper>
        <div className="image-container">
          <img src={item.images[0]} alt="product image" />
        </div>
        <div className="details-container">
          <span>{item.name}</span>
          <div>
            <span>{`${item.price} `}  </span>
            <span>{` ${item.quantity} `} </span>
            <span>{` ${item.size}`}</span>
          </div>
        </div>
      </OrderWrapper>
    </>
  );
};

const OrderWrapper = styled.div`
  width: 250px; /* Set a fixed width */
  height: auto;
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 10px;

.image-container {
  width: 60px;
  height: 60px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.details-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: center;
  align-items: start;
  width: 75%;
}

.details-container span:nth-child(1){
  font-size: medium;
}
.details-container div:nth-child(2){
  font-size: smaller;
  color: gray;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
`;

const Account = () => {
  const navigate = useNavigate();
  const {
    loginStatus,
    fetchUserData,
    setCartData,
    setLoginStatus,
    getUserOrders,
  } = useContext(ShopContext);
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const checkUserLogin = async () => {
      const response = await CheckLoginStatus();
      if (response.loggedIn) {
        console.log(response);
        setUserName(response.userData.name);
        const data = await getUserOrders();
        setOrders(data);
        // setCartData(response.userData.cartData)
      } else {
        // setLoginStatus(false)
        toast.error("user not logged in");
      }
    };

    checkUserLogin();
  }, []);

  console.log(orders)

  const handleLogout = async () => {
    try {
      const response = await LogoutUser();
      console.log(response);

      if(response.success){
        setLoginStatus(false);
        setCartData({});
        fetchUserData(); // Reset state
        navigate("/");
      }

    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar />
      <AccountWrapper>
        <div className="left-container">
          <div className="account-details">
            <h2>Account Details</h2>
            <span className="block">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              {userName}
            </span>
          </div>
          <div className="account-logout">
            <h2>Account</h2>
            <span className="cursor-pointer" onClick={handleLogout}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                sstrokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              logout
            </span>
          </div>
        </div>

        <div className="orders">
          <h3>Order History</h3>
          <div className="orders-container">
            {orders.slice(0, 5).map((order) => (
              order.items.map((item, itemIndex) => (
                <Order key={itemIndex} item={item} />
              ))
            ))}
          </div>
        </div>
      </AccountWrapper>
      <Footer />
    </>
  );
};

export default Account;

const AccountWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  margin-top: 5.5rem;

  .left-container {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  .account-details {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 1rem;
    }
    span {
      font-size: 1.2rem;
      margin: 1rem;
      text-transform: capitalize;

      svg {
        display: inline;
        margin: 10px;
      }
    }
  }

  .account-logout {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 1rem;
    }
    span {
      font-size: 1.2rem;
      margin: 1rem;
      text-transform: capitalize;
      transition: all 0.3s ease;

      svg {
        display: inline;
        margin: 10px;
      }
    }
    span:hover {
      text-decoration: underline;
      transform: scale(0.955);
    }
  }

  .orders {
    width: 50%;
    height: 100%;
    text-align: center;
    
    h3 {
      font-size: 1.5rem;
      font-weight: bold;
      height: 5%;
      margin: 1rem;
    }

    .orders-container {
      display: flex;
      height: 95%;
      flex-direction: row; 
      flex-wrap: wrap;
      width: 100%;
      justify-content: center; 
      align-items: center; 
      gap: 10px; 
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: max-content;
    flex-direction: column-reverse;

    .left-container,
    .orders {
      width: 100%;
    }

    .orders {
      height: max-content;
      border-bottom: 1.5px solid black;
      margin: 2rem 0px;

      .orders-container{
        margin: 4rem 0px;
      }
    }
  }
`;
