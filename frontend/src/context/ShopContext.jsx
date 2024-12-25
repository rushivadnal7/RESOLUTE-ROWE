import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckLoginStatus } from "../api/authapis";
import { UserCart } from "../api/cartapi";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [loading, setLoading] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState("");


    const [loginStatus, setLoginStatus] = useState(false)
    const [cartData, setCartData] = useState([])
    // const [isDark, setIsDark] = useState(
    //     localStorage.getItem("theme") === "dark" ? true : false
    // );

    const backendUrl = 'http://localhost:7000/';

    const CART_API = `http://localhost:7000/api/cart/`
    const currency = "₹";
    const delivery_fee = 100;
    // const navigate = useNavigate();

    // get all products
    const getProductsList = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/product/list");
            if (data.success) {
                setLoading(false);
                setAllProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // saving token to localStorage
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
        getProductsList();
    }, []);

    // to apply filter
    const applyFilter = useCallback(() => {
        let productCopy = [...allProducts];
        if (category.length > 0) {
            productCopy = productCopy.filter((product) =>
                category.includes(product.category)
            );
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter((product) =>
                subCategory.includes(product.subcategory)
            );
        }
        if (showSearchBar && search) {
            productCopy = productCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFilteredProducts(productCopy);
    }, [category, subCategory, search, showSearchBar, allProducts]);


    const fetchUserData = async () => {
        try {
            const response = await CheckLoginStatus();
            if (response.loggedIn) {
                setLoginStatus(true);
                const data = await UserCart();
                setCartData(data.cartData || {});
            } else {
                setLoginStatus(false);
                setCartData({});
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData(); // Initial data fetch
    }, []);

    // get user cart
    const getUserCart = async () => {
        try {
            const { data } = await axios.get(backendUrl + "api/cart/get", {}, { withCredentials: true });
            if (data.success) {
                setCartItems(data.cartData);
            }

            return data.cartData
        } catch (e) {
            console.log(e);
        }
    };



    // add to cart
    const addToCart = async (itemId, size, quantity) => {

        if (!size) {
            toast.error("Select Product Size");
            return;
        }
        let cart = cartData;
        console.log(cart)

        if (cart[itemId]) {
            if (cart[itemId][size]) {
                cart[itemId][size] += quantity;
            } else {
                cart[itemId][size] = quantity;
            }
        } else {
            cart[itemId] = {};
            cart[itemId][size] = quantity;
        }
        console.log(cart)
        setCartItems(cart);
        // if (token) {
        try {
            const response = await axios.post(backendUrl + "api/cart/add", { itemId, size, quantity }, { withCredentials: true });
            console.log(response.data)
            if (response.data) {
                toast.success('product added to cart')
            }
            return response.data
        } catch (e) {
            console.log(e);
            toast.error(e.message);
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


    // update Quantity
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (e) {
                console.log(e);
                toast.error(e.message);
            }
        }
    };

    const UpdateCartApi = async (itemId, size, quantity) => {

        let cart = cartData;
        cart[itemId][size] = quantity;
        setCartItems(cart);
        try {
            console.log(itemId, size, quantity)
            const response = await axios.post(`${CART_API}update`, { itemId, size, quantity }, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Something went wrong";
        }
    }

    // get cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = allProducts.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    totalAmount +=
                        (itemInfo.offer_price > 0 ? itemInfo.offer_price : itemInfo.price) *
                        cartItems[items][item];
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        allProducts,
        backendUrl,
        token,
        setToken,
        showSearchBar,
        setShowSearchBar,
        search,
        setSearch,
        filteredProducts,
        setFilteredProducts,
        category,
        setCategory,
        subCategory,
        setSubCategory,
        applyFilter,
        addToCart,
        getCartAmount,
        updateQuantity,
        getCartCount,
        getUserCart,
        currency,
        cartItems,
        setCartItems,
        delivery_fee,
        UpdateCartApi,
        loading,
        loginStatus,
        setLoginStatus,
        setCartData,
        fetchUserData,
        cartData
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider;