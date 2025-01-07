import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckLoginStatus } from "../api/authapis";
import { UserCart } from "../api/cartapi";
import { ListProductAPI } from "../api/productapi";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [loading, setLoading] = useState(false)
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [adminLoginStatus, setAdminLoginStatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false)
    const [cartData, setCartData] = useState({})

    const backendUrl = 'http://localhost:7007/';
    const CART_API = `http://localhost:7007/api/cart/`


    const fetchUserData = async () => {
        try {

            const response = await CheckLoginStatus();
            if (response.adminLoggedin) {
                setAdminLoginStatus(true)
            }
            if (response.loggedIn) {
                setLoginStatus(true);
                const data = await UserCart();
                setCartData(data.cartData || {});
            } else {
                setLoginStatus(false);
                const dataString = localStorage.getItem('cart-items')
                const localStrgCartData = JSON.parse(dataString);
                setCartData(localStrgCartData || {});
            }
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
            console.log(itemId, size, quantity)
            cart[itemId] = {};
            cart[itemId][size] = quantity;
        }

        setCartItems(cart);
        if (loginStatus) {
            try {
                const response = await axios.post(backendUrl + "api/cart/add", { itemId, size, quantity }, { withCredentials: true });
                // console.log(response.data)
                if (response.data) {
                    toast.success('product added to cart')
                }
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
                return response.data
            } catch (error) {
                throw error.response?.data?.message || "Something went wrong";
            }
        }
    }

    const contextValue = {
        allProducts,
        backendUrl,
        addToCart,
        getCartCount,
        cartItems,
        setCartItems,
        UpdateCartApi,
        loading,
        loginStatus,
        setLoginStatus,
        setCartData,
        fetchUserData,
        cartData,
        loading,
        setLoading,
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider;