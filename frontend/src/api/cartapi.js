import axios from "axios";

const CART_API = `http://localhost:7007/api/cart/`

export const UserCart = async () => {
    try {
        const response = await axios.get(`${CART_API}get`, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

