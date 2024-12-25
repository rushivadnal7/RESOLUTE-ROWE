import React, { useEffect, useState } from "react";
import { ProductList, ListItem, ModalButtons, ModalHeader, ModalContent, ModalOverlay } from "../../wrappers/admin";
import { toast } from "react-toastify";
import { ListDesignAPI, removeDesignAPI } from "../../api/designApis";

const ListDesigns = () => {
    const [designList, setDesignList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = await ListDesignAPI();
                console.log("API Response:", data);

                if (isMounted) {
                    setDesignList(data.designs);
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
    }, [designList]);

    console.log(designList)

    const openDeleteModal = (id) => {
        setSelectedDesign(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDesign(null);
    };

    const deleteProduct = async () => {
        try {
            const response = await removeDesignAPI(selectedDesign);
            if (response.success) {
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
            {/* the product list styled component is used from product list page of admin panel */}
            <ProductList>  
                {Array.isArray(designList) && designList.length > 0 ? (designList.map((design) => (
                    <ListItem key={design._id}>
                        <div
                            onClick={() => openDeleteModal(design._id)}
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
                        <img
                            src={design.image[0]}
                            alt={design.name}
                            style={{ width: "100px", height: "100px" }}
                        />
                        <h3>{design.name}</h3>
                        <p>Price: {design.price}</p>
                    </ListItem>
                ))
                ) : (
                    <p>No products found.</p>
                )}
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
    )
}

export default ListDesigns;