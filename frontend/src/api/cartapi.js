import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const UserCart = async () => {
  try {
    const response = await axios.get(backendURL + "/api/cart/get", {
      withCredentials: true,    
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const addCartDataLStrgToDb = async (cartData) => {
  try {
    const response = await axios.post(backendURL + "/api/cart/lstrgtodb", cartData , {
      withCredentials: true,    
    });
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
}
