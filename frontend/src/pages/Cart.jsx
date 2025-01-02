import React, { useEffect, useState, useContext  } from 'react';
import { CartWrapper, CartItems, CartItem, SummarySection, PaymentInfo, PaymentButton, QuantitySelector } from '../wrappers/cart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { ShopContext } from "../context/ShopContext";
import {findProduct } from "../api/productapi";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartData, addToCart, UpdateCartApi } = useContext(ShopContext)
    const navigate = useNavigate()
 
    const [cartItems, setCartItems] = useState([]);
    const [couponCode, setCouponCode] = useState('')
    const [discountedRate, setDiscountedRate] = useState(null)
    const [discount, setDiscount] = useState('no discount');
    const [couponPlaceholder, setCouponPlaceholder] = useState('discount code');
    const [loading, setLoading] = useState(false);
    const [couponLoading, setCouponLoading] = useState(false);

    const fetchCartItems = async () => {
        setLoading(true)
        const startTime = Date.now();
        try {
            const productIds = Object.keys(cartData);
            const products = await Promise.all(productIds.map(id => findProduct(id)));

            const productData = products.map(item => item.product);

            const formattedCartItems = productData.map(product => {
                const productId = String(product._id);
                const sizes = cartData[productId];

                return Object.entries(sizes).map(([size, quantity]) => ({
                    id: productId,
                    name: product.name,
                    img: product.images[0],
                    price: product.price,
                    color: product.color,
                    size: size,
                    quantity: quantity,
                }));
            }).flat();

            setCartItems(formattedCartItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            const elapsedTime = Date.now() - startTime;
            const minimumLoadingTime = 2000;

            const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

            setTimeout(() => {

                setLoading(false);

            }, remainingTime);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    useEffect(() => {
        if (Object.keys(cartData).length > 0) {
            fetchCartItems();
        }
    }, [cartData]);

    const updateQuantity = async (id, size, delta) => {
        let updatedQuantity;
        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === id && item.size === size) {
                    updatedQuantity = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: updatedQuantity };
                }
                return item;
            });
        });

        const updatedCartItems = cartItems.map(item => {
            if (item.id === id && item.size === size) {
                return { ...item, quantity: Math.max(0, item.quantity + delta) };
            }
            return item;
        });
        updatedQuantity = updatedCartItems.find(item => item.id === id && item.size === size).quantity;
        try {
            const response = await UpdateCartApi(id, size, updatedQuantity)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    };

    const removeProduct = async (id, size) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size)));

        const updatedCartData = { ...cartData };
        if (updatedCartData[id] && updatedCartData[id][size]) {
            delete updatedCartData[id][size];
            if (Object.keys(updatedCartData[id]).length === 0) {
                delete updatedCartData[id];
            }
        }

        try {
            const response = await UpdateCartApi(id, size, 0);
            // toast.success("Item removed successfully!");
            console.log(response.message);
        } catch (error) {
            console.error("Error removing product:", error);
            toast.error(error || "Failed to remove the item from the cart.");
        }
    };

    const couponApply = () => {
        const totalPrice = calculateSubtotal();
        console.log(totalPrice)
        setCouponLoading(true)
        setTimeout(() => {
            if (couponCode === 'TOP10') {
                setDiscountedRate(totalPrice - (totalPrice * 25) / 100);
                setDiscount('25%');
            } else {
                setCouponCode('');
                setCouponPlaceholder('no discounts available');
            }
            setCouponLoading(false); 
        }, 500);

    }

    const continueShoppingHandler = () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
        } else {
            navigate('/cart/customerdetails' ,{state:cartItems} )
        }
    }




    return (
        <>
            <Navbar />
            <CartWrapper>
                <div className='cart-info'>
                    <CartItems>
                        <h2>{loading ? '' : 'Shopping Cart'}</h2>
                        {

                            loading ? (
                                <div className="skeleton-cards">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="skeleton-card"></div>
                                    ))}
                                </div>
                            ) :

                                cartItems.length === 0 ? (
                                    <p className=' py-8 m-auto text-3xl' >No items in cart</p>
                                ) :
                                    cartItems.map(item => (
                                        <CartItem key={item.id}>
                                            <img src={item.img} alt={item.name} />
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p className='uppercase'>{item.size}</p>
                                            </div>
                                            <QuantitySelector>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, -1)}
                                                    disabled={item.quantity === 1}
                                                    className={item.quantity === 1 ? 'disabled-button text-gray-400' : ''}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
                                            </QuantitySelector>
                                            <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                                            <button className='delete-button' onClick={() => removeProduct(item.id, item.size)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>
                                            </button>
                                        </CartItem>
                                    ))
                        }
                    </CartItems>

                    <SummarySection>

                        <div className="coupon-code">
                            <input type="text" className={loading ? 'skeleton' : ''} placeholder={couponPlaceholder} value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                            <button className={loading ? 'skeleton' : ''} onClick={couponApply}>{loading ? '' : 'apply'}</button>
                        </div>

                        {
                            loading ? (
                                <div className="summary-skeleton-card">

                                </div>
                            ) :
                                <>
                                    <div>
                                        <p>Subtotal:</p>
                                        <p>₹{discountedRate ? discountedRate : calculateSubtotal()}</p>
                                    </div>
                                    <div>
                                        <p>Shipping:</p>
                                        <p>Free shipping</p>
                                    </div>
                                    <div>
                                        <p>discount:</p>
                                        {
                                            couponLoading ?
                                                <Spinner size={20} />
                                                :
                                                <p>{discount}</p>
                                        }
                                    </div>
                                    <div>
                                        <strong>Total:</strong>
                                        <strong>₹{discountedRate ? discountedRate : calculateSubtotal()}</strong>
                                    </div>
                                    <Button onclick={continueShoppingHandler} text={'continue shopping'} />
                                </>
                        }

                    </SummarySection>
                </div>
            </CartWrapper>
            <Footer />
        </>
    );
};

export default Cart;
