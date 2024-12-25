import axios from 'axios'

const API_URL = 'http://localhost:7000/api/user/'
const AUTH_API_URL = 'http://localhost:7000/api/auth/'

export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}register`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}
export const LoginUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}login`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const LogoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}logout`, {}, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}


export const CheckLoginStatus = async () => {
    try {
        const response = await axios.get(`${AUTH_API_URL}status`, {
            withCredentials: true, // Ensure cookies are sent
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message || 'Something went wrong';
    }
};