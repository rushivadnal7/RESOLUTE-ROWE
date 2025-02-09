import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/`

export const adminLogin = async (data) => {
    try {
        const response = await axios.post(`${API_URL}login`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const adminLogout = async () => {
    try {
        console.log('clicked logout button')
        const response = await axios.post(`${API_URL}logout`, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const validateAdmin = async () => {
    try {
        const response = await axios.get(`${API_URL}validate`, { withCredentials: true })
        return response.data.isAdmin
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}
