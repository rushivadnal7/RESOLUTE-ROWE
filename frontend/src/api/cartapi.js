import axios from "axios";

const CART_API = `http://localhost:7000/api/cart/`

// export const UpdateCartApi = async (itemId , size , quantity) => {
//     console.log(itemId , size , quantity)
//    try {
//        const response = await axios.post(`${CART_API}update`,{itemId , size , quantity} ,{ withCredentials: true })
//        return response.data
//    } catch (error) {
//        throw error.response?.data?.message || "Something went wrong";
//    }
// }

export const UserCart = async () => {
    try {
        const response = await axios.get(`${CART_API}get`, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

