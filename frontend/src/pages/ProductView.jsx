import React, { useContext, useState, useEffect } from 'react';
import {
    ProductViewWrapper,
    Container,
    ContentWrapper,
    QuantityWrapper,
    QuantityDisplay,
    QuantityButton,
    Title,
    ProductName,
    Rating,
    RatingStars,
    RatingText,
    OptionsWrapper,
    ColorOptions,
    SizeOptions,
    PriceWrapper,
    Price,
    RelatedProductsList,
    ProductImages,
    PaymentGateway,
    ProductDescriptionContainer,
    FabricDescriptionContainer,
    PrintDescriptionContainer,
    ShareButton,
    SizeChart
} from '../wrappers/productView';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import BorderButton from '../components/BorderButton'
import razorpay from "../assets/upi_color_card.svg";
import Gpay from "../assets/googlepay_color_card.svg";
import SizeChartModal from '../components/SizeChartModal';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';



const ProductView = () => {
    const navigate = useNavigate()
    const { productID } = useParams();
    const [quantity, setQuantity] = useState(1);
    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const { addToCart, allProducts, setBuyData } = useContext(ShopContext)
    const [favoriteSelected, setFavoriteSelected] = useState(false)
    const [selectedSize, setSelectedSize] = useState("");
    const [productData, setProductData] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [copied, setCopied] = useState(false);
    const pageUrl = window.location.href; // Get current page URL


    const copyToClipboard = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopied(true);
            toast.info('url copied')
            setTimeout(() => setCopied(false), 2500);

        });
    };

    const generateRandomNum = () => {
        return Math.floor(Math.random() * allProducts.length); // ✅ Corrected random number calculation
    };

    const relatedProductsAlgorithm = () => {
        let newRelatedProducts = [];
        for (let i = 0; i < 4; i++) {  // ✅ Loop should be from 0 to 3
            const randomIndex = generateRandomNum();
            if (allProducts[randomIndex]) {
                newRelatedProducts.push(allProducts[randomIndex]); // ✅ Collect in an array first
            }
        }
        setRelatedProducts(newRelatedProducts); // ✅ Update state once
    };

    useEffect(() => {
        relatedProductsAlgorithm();
    }, [allProducts]);


    useEffect(() => {
        window.scrollTo(0, 0)
        const foundProduct = allProducts.find((product) => product._id === productID);
        if (!foundProduct) {
            console.warn(`Product with ID ${productID} not found.`);
        }
        setProductData(foundProduct || {});
    }, [allProducts, productID]);

    const productId = productID
    const name = productData?.name
    const description = productData?.description
    const price = productData?.price
    const sizesValue = productData?.sizes || [];
    const sizesArray = sizesValue.length > 0 ? sizesValue[0]?.split(',') : [];



    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        const rootDiv = document.getElementById("root"); // Select the #root div
        if (rootDiv) {
            rootDiv.style.overflow = "hidden";
        } setIsModalOpen(true)
    }
        ;
    const handleCloseModal = () => {
        const rootDiv = document.getElementById("root");
        if (rootDiv) {
            rootDiv.style.overflow = " ";
        }
        setIsModalOpen(false)
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleBuyButton = () => {
        if (selectedSize) {
            const data = [{
                productID: productId,
                size: selectedSize,
                quantity: quantity,
                name: name,
                price: price,
                description: description,
                img: productData?.images[0],
            }]

            // setBuyData(data)
            navigate('/customerdetails', { state: data })
        } else {
            toast.error('select a size')
        }
    }


    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size before adding to cart!");
            return;
        }
        addToCart(productId, selectedSize, quantity); // Call addToCart with selected size

    };

    useEffect(() => {
        if (isModalOpen) {
            console.log(isModalOpen)
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            const rootDiv = document.getElementById("root"); // Select the #root div
            if (rootDiv) {
                rootDiv.style.overflow = "hidden"; // Disable scroll for #root
            }
            // console.log(document.body.style)
        } else {
            document.body.style.overflow = ""; // Revert to the default style
            document.documentElement.style.overflow = "";

            const rootDiv = document.getElementById("root"); // Select the #root div
            if (rootDiv) {
                rootDiv.style.overflow = " "; // Disable scroll for #root
            }
        }

        // Cleanup on component unmount
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";

            const rootDiv = document.getElementById("root"); // Select the #root div
            if (rootDiv) {
                rootDiv.style.overflow = " "; // Disable scroll for #root
            }
        };
    }, [isModalOpen]);

    // console.log(RelatedProducts)

    return (

        <>
            <Helmet>
                <title>product view</title>
                <meta property="og:title" content={'zoro'} />
                <meta property="og:description" content={'zorozorozroro'} />
                <meta property="og:image" content={productData?.images[0]} />
                <meta property="og:url" content={`https://yourdomain.com/blogs/${productID}`} />
                <meta property="og:type" content="article" />
            </Helmet>
            <Navbar />
            <ProductViewWrapper className={isModalOpen ? 'overflow-hidden' : ''} scrollDisable={isModalOpen}>
                <Container className={isModalOpen ? 'overflow-hidden' : ''}>
                    <ProductImages>
                        <ProductImages>
                            {productData?.images?.length ? (
                                productData.images.map((img, index) => (
                                    <img key={index} src={img} className="product-view-image" alt={`Product ${index}`} />
                                ))
                            ) : (
                                <p>No images available for this product.</p>
                            )}
                        </ProductImages>
                    </ProductImages>
                    <ContentWrapper>
                        <Title>Resolute & Rowe</Title>
                        <ProductName>{name}</ProductName>
                        <Rating>
                            <RatingStars>
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 text-gray-600"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                ))}
                            </RatingStars>
                            <RatingText>5 star Reviews</RatingText>
                        </Rating>
                        <OptionsWrapper>
                            <ColorOptions>
                                <span>Color</span>
                                {
                                    productData?.colors?.map((color, index) => (
                                        <button className={`color-btn ${color} `} />
                                    ))
                                }
                            </ColorOptions>
                            <SizeOptions>
                                {/* <span>Size</span> */}
                                <select
                                    id="sizeSelector"
                                    value={selectedSize} // Bind the select's value to state
                                    onChange={handleSizeChange} // Handle change event
                                >
                                    <option value="select size">Select size</option>
                                    {sizesArray.map((size, index) => (
                                        <option key={index} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </SizeOptions>
                        </OptionsWrapper>

                        <PriceWrapper>
                            <Price>₹ {price}/-</Price>
                            <QuantityWrapper>
                                <QuantityButton onClick={handleDecrement}>-</QuantityButton>
                                <QuantityDisplay>{quantity}</QuantityDisplay>
                                <QuantityButton onClick={handleIncrement}>+</QuantityButton>
                            </QuantityWrapper>
                            <BorderButton text={'Buy'} onclick={handleBuyButton} bgColor={'white'} />
                            <Button onclick={handleAddToCart} text={'Add to Cart'} />
                        </PriceWrapper>
                        <PaymentGateway>
                            <img src={razorpay} alt="razorpay" />
                            <img src={Gpay} alt="gpay" />
                        </PaymentGateway>
                        <ProductDescriptionContainer>
                            <h1>Design Name</h1>
                            <p>
                                {description}                            </p>
                            <ol start={1}>
                                <li>100% Premium Cotton</li>
                                <li>Weight - 240 GSM</li>
                                <li>High Density (HD) Print</li>
                                <li>Oversized drop shoulder fit</li>
                            </ol>
                        </ProductDescriptionContainer>
                        <FabricDescriptionContainer>
                            <h1>Fabric</h1>
                            <p>
                                This oversized tee is made from high-quality cotton weighing 240 GSM, ensuring both comfort and longevity.
                            </p>
                        </FabricDescriptionContainer>
                        <PrintDescriptionContainer>
                            <h1>Print</h1>
                            <p>
                                This oversized tee is made from high-quality cotton weighing 240 GSM, ensuring both comfort and longevity.
                            </p>
                        </PrintDescriptionContainer>
                        <ShareButton onClick={copyToClipboard}>
                            Share
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                        </ShareButton>

                    </ContentWrapper>
                    <RelatedProductsList>
                        <h1>You may also like</h1>
                        <div className="other-products">
                            {
                                relatedProducts.map((product, index) => {
                                    return (
                                        <>
                                            <div className='product'>
                                                <img src={product?.images[0]} alt="product image" />
                                                <span>{product?.name}</span>
                                                <span>{product?.price}</span>
                                            </div>
                                        </>

                                    )
                                })
                            }
                        </div>
                    </RelatedProductsList>
                </Container>
            </ProductViewWrapper>
            <SizeChart>

                {/* Product Details */}
                <button className='size-button' onClick={handleOpenModal}>Size Guide <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
                </button>

                <SizeChartModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </SizeChart>
            <Footer />

        </>
    );
};

export default ProductView;
