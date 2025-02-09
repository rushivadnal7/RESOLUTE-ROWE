import axios from 'axios'


export const sendOTP = async (email) => {
    try {
        console.log(email)
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/otp/send`, {email})
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const verifyOTP = async (email, otp) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/otp/verify`, { email, otp })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

