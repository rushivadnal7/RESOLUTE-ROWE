import axios from 'axios'
import { useState } from 'react'


const API_URL = 'http://localhost:7007/api/product/'

export const addProductAPI = async (data) => {
    try {
        const response = await axios.post(`${API_URL}add`, data)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const findProduct = async (productId) => {
    try {
        const response = await axios.post(`${API_URL}single`, { productId })
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const removeProductAPI = async (id) => {
    try {
        const response = await axios.post(`${API_URL}remove`, { id })
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}
export const ListProductAPI = async () => {
    try {
        const response = await axios.get(`${API_URL}list`)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

