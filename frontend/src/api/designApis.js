import axios from "axios";
const API_URL = 'http://localhost:7007/api/designs/'


export const addDesignAPI = async (data) => {
    try {
        const response = await axios.post(`${API_URL}add`, data)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const removeDesignAPI = async (id) => {
    try {
        const response = await axios.post(`${API_URL}remove`, { id })
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}
export const ListDesignAPI = async () => {
    try {
        const response = await axios.get(`${API_URL}list`)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}
