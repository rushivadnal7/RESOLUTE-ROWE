import React, { useEffect, useState } from "react";
import { ProductList, ListItem, ModalButtons, ModalHeader, ModalContent, ModalOverlay } from "../../wrappers/admin";
import { toast } from "react-toastify";
import { ListProductAPI, removeProductAPI } from "../../api/productapi";

const ListProducts = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = await ListProductAPI();
                
                if (isMounted) {
                    setProductList(data.products);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching product list:", error);
                    toast.error("Something went wrong. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup
        };
    }, [productList]);

    const openDeleteModal = (id) => {
        setSelectedProduct(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const deleteProduct = async () => {
        try {
            const response =  await removeProductAPI(selectedProduct);
            if(response.success){
                toast.success(response.message);
            }        
            console.log(response.products)
        } catch (error) {
            toast.error(error);
        } finally {
            closeModal();
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <>
            <ProductList>
                {productList.map((prod) => (
                    <ListItem key={prod._id}>
                        <div className="edit-option-button">
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
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                        </div>
                        <div
                            onClick={() => openDeleteModal(prod._id)}
                            className="delete-option-button"
                        >
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
                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                />
                            </svg>
                        </div>
                        {prod.images && prod.images.length > 0 ? (
                            <img
                                src={prod.images[0]}
                                alt={prod.name}
                                style={{ width: "100px", height: "100px" }}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                        <h3>{prod.name}</h3>
                        <p>{prod.description}</p>
                        <p>Price: {prod.price}</p>
                        <p>Sizes: {prod.sizes.join(", ")}</p>
                    </ListItem>
                ))}
            </ProductList>

            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Confirm Deletion</ModalHeader>
                        <p>Are you sure you want to delete this product?</p>
                        <ModalButtons>
                            <button className="confirm" onClick={deleteProduct}>
                                Yes, Delete
                            </button>
                            <button className="cancel" onClick={closeModal}>
                                Cancel
                            </button>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

export default ListProducts;
