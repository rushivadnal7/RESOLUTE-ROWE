import axios from 'axios';

export const createOrder = async (orderData) => {
    console.log(orderData)
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/delhivery/create-order`,
            orderData,
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("🚨 Error creating order:", error);
        return { error: "Failed to create order" };
    }
};

// **Track Order API using axios**
export const trackOrder = async (waybill) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/delhivery/track-order/${waybill}`
        );
        return response.data;
    } catch (error) {
        console.error("🚨 Error tracking order:", error);
        return { error: "Failed to track order" };
    }
};
