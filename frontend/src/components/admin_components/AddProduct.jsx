import React, { useState } from 'react'
import {
    Form,
    Button,
    Input,
    ImageUploadSection,
    ImageBox,
    TextArea,
} from "../../wrappers/admin";
import { toast } from 'react-toastify'
import { addProductAPI } from "../../api/productapi";
import { Spinner, SpinnerContainer } from '../../utils/wrappers/spinner';

const AddProduct = () => {
    const [product, setProduct] = useState({
        frontImage: null,
        backImage: null,
        thirdImage: null,
        fourthImage: null,
        name: "",
        description: "",
        price: "",
        market_rate: "",
        sizes: [],
        colors: [],
    });

    const [sizeInput, setSizeInput] = useState("");
    const [colorInput, setColorInput] = useState("");

    const [loading, setLoading] = useState(false)

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        setProduct({ ...product, [type]: file });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Add size to the list
    const addSize = () => {
        if (sizeInput.trim() === "") return;
        setProduct({ ...product, sizes: [...product.sizes, sizeInput] });
        setSizeInput("");
    };

    // Add color to the list
    const addColor = () => {
        if (colorInput.trim() === "") return;
        setProduct({ ...product, colors: [...product.colors, colorInput] });
        setColorInput("");
    };


    // Add product to the list
    const addProduct = async (e) => {
        e.preventDefault();

        // Ensure required fields are present
        if (!product.frontImage || !product.backImage) {
            toast.error("Please add both front-view and back-view images!");
            return;
        }

        setLoading(true)
        try {
            // Prepare FormData
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("market_rate", product.market_rate);
            formData.append("sizes", JSON.stringify(product.sizes));
            formData.append("colors", JSON.stringify(product.colors));
            formData.append("frontImage", product.frontImage);
            formData.append("backImage", product.backImage);
            if (product.thirdImage) formData.append("thirdImage", product.thirdImage);
            if (product.fourthImage) formData.append("fourthImage", product.fourthImage);

            // Call the API
            const response = await addProductAPI(formData);
            if (response.success) {
                toast.success("Product Added Successfully");

                // Reset the form after successful submission
                setProduct({
                    frontImage: null,
                    backImage: null,
                    thirdImage: null,
                    fourthImage: null,
                    name: "",
                    description: "",
                    price: "",
                    market_rate: "",
                    sizes: [],
                    colors: [],
                });

                // setProductList([...productList, product]); // Update local product list if necessary
            } else {
                toast.error(response.message);
                console.error(response.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false)
        }
    };


    return (
        <>
            <Form >
                {/* Loading Spinner */}
                {loading && (
                    <SpinnerContainer>
                        <Spinner></Spinner>
                    </SpinnerContainer>
                )}
                <h2>Add New Product</h2>
                {/* Updated Image upload section */}
                <ImageUploadSection>
                    <h3>Upload Images</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {/* Front View Image */}
                        <ImageBox>
                            <label htmlFor="frontImageUpload">
                                <div style={{ border: "1px dashed #ccc", padding: "20px", textAlign: "center" }}>
                                    {product.frontImage ? (
                                        <img
                                            src={URL.createObjectURL(product.frontImage)}
                                            alt="Front View"
                                            style={{ maxWidth: "100%", maxHeight: "100px" }}
                                        />
                                    ) : (
                                        <>
                                            <p>Front View Image</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                style={{ width: "40px", height: "40px" }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="frontImageUpload"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageUpload(e, "frontImage")}
                            />
                        </ImageBox>

                        {/* Back View Image */}
                        <ImageBox>
                            <label htmlFor="backImageUpload">
                                <div style={{ border: "1px dashed #ccc", padding: "20px", textAlign: "center" }}>
                                    {product.backImage ? (
                                        <img
                                            src={URL.createObjectURL(product.backImage)}
                                            alt="Back View"
                                            style={{ maxWidth: "100%", maxHeight: "100px" }}
                                        />
                                    ) : (
                                        <>
                                            <p>Back View Image</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                style={{ width: "40px", height: "40px" }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="backImageUpload"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageUpload(e, "backImage")}
                            />
                        </ImageBox>

                        {/* Third Image */}
                        <ImageBox>
                            <label htmlFor="thirdImageUpload">
                                <div style={{ border: "1px dashed #ccc", padding: "20px", textAlign: "center" }}>
                                    {product.thirdImage ? (
                                        <img
                                            src={URL.createObjectURL(product.thirdImage)}
                                            alt="Third Image"
                                            style={{ maxWidth: "100%", maxHeight: "100px" }}
                                        />
                                    ) : (
                                        <>
                                            <p>Upload</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                style={{ width: "40px", height: "40px" }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="thirdImageUpload"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageUpload(e, "thirdImage")}
                            />
                        </ImageBox>

                        {/* Fourth Image */}
                        <ImageBox>
                            <label htmlFor="fourthImageUpload">
                                <div style={{ border: "1px dashed #ccc", padding: "20px", textAlign: "center" }}>
                                    {product.fourthImage ? (
                                        <img
                                            src={URL.createObjectURL(product.fourthImage)}
                                            alt="Fourth Image"
                                            style={{ maxWidth: "100%", maxHeight: "100px" }}
                                        />
                                    ) : (
                                        <>
                                            <p>Upload</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                style={{ width: "40px", height: "40px" }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="fourthImageUpload"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageUpload(e, "fourthImage")}
                            />
                        </ImageBox>
                    </div>
                </ImageUploadSection>

                <Input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                />
                <TextArea name="description"
                    placeholder="Product Description"
                    value={product.description}
                    onChange={handleChange} />

                <Input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={product.price}
                    onChange={handleChange}
                />
                <Input
                    type="number"
                    name="market_rate"
                    placeholder="Market Price"
                    value={product.market_rate}
                    onChange={handleChange}
                />

                {/* Sizes */}
                <div>
                    <h3>Sizes</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Input
                            type="text"
                            placeholder="Add Size (e.g., S, M, L)"
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                        />
                        <Button onClick={addSize}>Add Size</Button>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        {product.sizes.map((size, index) => (
                            <span key={index} style={{ marginRight: "10px" }}>
                                {size}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Colors */}
                <div>
                    <h3>Colors</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Input
                            type="text"
                            placeholder="Add Color (e.g., Red, Blue)"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                        />
                        <Button onClick={addColor}>Add Color</Button>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        {product.colors.map((color, index) => (
                            <span key={index} style={{ marginRight: "10px" }}>
                                {color}
                            </span>
                        ))}
                    </div>
                </div>

                <Button onClick={addProduct}>Add Product</Button>
            </Form>
        </>
    )
}

export default AddProduct