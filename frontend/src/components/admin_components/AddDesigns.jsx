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

import { Spinner, SpinnerContainer } from '../../utils/wrappers/spinner';
import { addDesignAPI } from '../../api/designApis';

const AddDesigns = () => {
    const [design, setDesign] = useState({
        image: null,
        name: "",
        price: "",
    });

    const [loading, setLoading] = useState(false)


    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        setDesign({ ...design, [type]: file });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesign({ ...design, [name]: value });
    };


    const addDesign = async (e) => {
        e.preventDefault();

    
        setLoading(true)
        try {
            // Prepare FormData
            const formData = new FormData();
            formData.append("name", design.name);
            formData.append("price", design.price);
            formData.append("image", design.image);

            // Call the API
            const response = await addDesignAPI(formData);
            if (response.success) {
                toast.success("Design Added Successfully");

                // Reset the form after successful submission
                setDesign({
                    image:null,
                    name: "",
                    price: ""
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
            <Form>

                {/* Loading Spinner */}
                {loading && (
                    <SpinnerContainer>
                        <Spinner></Spinner>
                    </SpinnerContainer>
                )}
                <h2>Add New Product</h2>
                <ImageUploadSection>
                    <h3>Upload Images</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <ImageBox>
                            <label htmlFor="frontImageUpload">
                                <div style={{ border: "1px dashed #ccc", padding: "20px", textAlign: "center" }}>
                                    {design.image ? (
                                        <img
                                            src={URL.createObjectURL(design.image)}
                                            alt="Front View"
                                            style={{ maxWidth: "100%", maxHeight: "100px" }}
                                        />
                                    ) : (
                                        <>
                                            <p>Design Image</p>
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
                                onChange={(e) => handleImageUpload(e, "image")}
                            />
                        </ImageBox>

                    </div>
                </ImageUploadSection>
                <Input
                    type="text"
                    name="name"
                    placeholder="design Name"
                    value={design.name}
                    onChange={handleChange}
                />
                <Input
                    type="number"
                    name="price"
                    placeholder="design Price"
                    value={design.price}
                    onChange={handleChange}
                />

                <Button onClick={addDesign}>Add Product</Button>
            </Form>
        </>
    )
}

export default AddDesigns