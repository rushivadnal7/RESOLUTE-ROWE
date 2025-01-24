import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckLoginStatus } from "../api/authapis";
import { UserCart } from "../api/cartapi";
import { ListProductAPI } from "../api/productapi";
import Cookies from 'js-cookie'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [loading, setLoading] = useState(false)
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [adminLoginStatus, setAdminLoginStatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false)
    const [cartData, setCartData] = useState({})
    const [buyData, setBuyData] = useState({})
    const [sessionId, setSessionId] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const CART_API = `http://localhost:7007/api/cart/`;
    const delivery_fee = 100;
    const currency = "₹";


    const fetchUserData = async () => {
        try {
            const response = await CheckLoginStatus();
            if (response.adminLoggedin) {
                setAdminLoginStatus(true)
            }
            if (response.loggedIn) {
                setLoginStatus(true);
            } else {
                setLoginStatus(false);
            }
            if (!document.cookie.includes("sessionId")) {
                let sessionId = '';
                for (let i = 0; i < 24; i++) {
                    sessionId += Math.floor(Math.random() * 10);
                }
                document.cookie = `sessionId=${sessionId}; path=/`;
                setSessionId(sessionId);
            } else {
                const cookies = document.cookie.split("; ");
                const sessionCookie = cookies.find((cookie) => cookie.startsWith("sessionId="));
                setSessionId(sessionCookie ? sessionCookie.split("=")[1] : null)
            }
            const dataString = localStorage.getItem('cart-items')
            const localStrgCartData = JSON.parse(dataString);
            setCartData(localStrgCartData || {});
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await ListProductAPI();
            if (data.products) {
                setAllProducts(data.products);
            } else {
                console.error('No products found');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchProducts();
    }, []);


    const sessionIdToUserId = async () => {

        if (loginStatus) {
            try {
                console.log(`updating the user id : ${sessionId}`)
                const response = await axios.post(backendUrl + "api/order/updateuserid", { sessionId }, { withCredentials: true })
                if (response.data.success) {
                    console.log(response.data.message)
                }
            } catch (error) {
                console.error(error.message)
                console.log('userId not updated')
            }
            // Cookies.remove('sessionId')
        }
        // setSessionId('')
    }

    useEffect(() => {
        sessionIdToUserId()
    }, [loginStatus])



    // add to cart
    const addToCart = async (itemId, size, quantity) => {

        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cart = cartData;
        if (cart[itemId]) {
            if (cart[itemId][size]) {
                cart[itemId][size] += quantity;
            } else {
                cart[itemId][size] = quantity;
            }
        } else {
            // console.log(itemId, size, quantity)
            cart[itemId] = {};
            cart[itemId][size] = quantity;
        }

        setCartItems(cart);
        if (loginStatus) {
            try {
                const response = await axios.post(backendUrl + "api/order/verifyrazorpay", { itemId, size, quantity }, { withCredentials: true });
                // console.log(response.data)
                if (response.data) {
                    toast.success('product added to cart')
                }
                localStorage.setItem('cart-items', JSON.stringify(cart))
                return response.data
            } catch (e) {
                // console.log(e);
                toast.error(e.message);
            }
        } else {
            localStorage.setItem('cart-items', JSON.stringify(cart))
        }
        // }
    };


    // get cart count
    const getCartCount = (cartItemsArray) => {
        let totalCount = 0;
        // console.log(cartItemsArray) 
        console.log(cartItemsArray)
        for (const itemId in cartItemsArray) {
            if (cartItemsArray[itemId]) {
                for (const size in cartItemsArray[itemId]) {
                    // console.log(cartItemsArray[itemId][size]) 
                    const count = cartItemsArray[itemId][size];
                    if (typeof count === "number" && count > 0) {
                        totalCount += count;
                    }
                }
            }
        }
        console.log(totalCount)
        return totalCount;
    };



    const UpdateCartApi = async (itemId, size, quantity) => {
        let cart = cartData;
        // Handle removal when quantity is 0
        if (quantity === 0) {
            if (cart[itemId] && cart[itemId][size]) {
                // Remove the specific size
                delete cart[itemId][size];

                // If no sizes remain, remove the product completely
                if (Object.keys(cart[itemId]).length === 0) {
                    delete cart[itemId];
                }
            } else if (cart[itemId]) {
                delete cart[itemId];
            }
        } else {
            // Update the quantity
            if (!cart[itemId]) {
                cart[itemId] = {}; // Initialize the item if not present
            }
            cart[itemId][size] = quantity;
        }
        setCartData(cart);
        setCartItems(cart);
        console.log(cart)
        if (!loginStatus) {
            return localStorage.setItem('cart-items', JSON.stringify(cart))
        } else {
            try {
                console.log(itemId, size, quantity)
                const response = await axios.post(`${CART_API}update`, { itemId, size, quantity }, { withCredentials: true })
                if (response.data.success) {
                    localStorage.setItem('cart-items', JSON.stringify(cart))
                }
                return response.data
            } catch (error) {
                throw error.response?.data?.message || "Something went wrong";
            }
        }
    }

    // GET CART AMOUNT
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartData) {
            let itemInfo = allProducts.find((product) => product._id === items);
            for (const item in cartData[items]) {
                try {
                    totalAmount +=
                        (itemInfo.offer_price > 0 ? itemInfo.offer_price : itemInfo.price) *
                        cartData[items][item];
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return totalAmount;
    };

    // Check if a user exists in the database
    const checkUserExists = async (email) => {
        console.log(email)
        try {
            const response = await axios.post(`${backendUrl}api/user/checkuserexists`, {
                email,
            });
            return response.data.exists;
        } catch (error) {
            console.error("Error in checkUserExists:", error);
            throw error;
        }
    };

    const contextValue = {
        allProducts,
        getCartAmount,
        currency,
        delivery_fee,
        backendUrl,
        addToCart,
        getCartCount,
        cartItems,
        setCartItems,
        UpdateCartApi,
        loading,
        loginStatus,
        setLoginStatus,
        fetchUserData,
        cartData,
        setCartData,
        loading,
        setLoading,
        setBuyData,
        buyData,
        checkUserExists,
        sessionId,
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider;