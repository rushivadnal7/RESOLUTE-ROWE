import axios from "axios";

const DELHIVERY_API_URL = process.env.DELHIVERY_API_URL;
const CLIENT_TOKEN = process.env.DELHIVERY_CLIENT_TOKEN;
const WAREHOUSE_NAME = process.env.DELHIVERY_WAREHOUSE_NAME;

export const createOrder = async (req, res) => {
    try {
        const { expected_package_count } = req.body;

        const getCurrentDateTime = () => {
            const now = new Date();

            // Format date as YYYY-MM-DD
            const pickup_date = now.toISOString().split('T')[0];

            // Format time as HH:MM:SS
            const pickup_time = now.toLocaleTimeString('en-US', { hour12: false });

            return { pickup_date, pickup_time };
        };

        const { pickup_date, pickup_time } = getCurrentDateTime();

        console.log('expected package count ',expected_package_count )
        console.log('pickup date', pickup_date )
        console.log('pickup time', pickup_time )
        console.log('Warehouse name', WAREHOUSE_NAME )
        console.log('delhivery api url', DELHIVERY_API_URL )
        console.log('client token', CLIENT_TOKEN )

        const orderData = {
            pickup_time,   // Required Time (HH:MM:SS)
            pickup_date,   // Required Date (YYYY-MM-DD)
            pickup_location: WAREHOUSE_NAME,
            expected_package_count
        };

        const response = await axios.post(`${DELHIVERY_API_URL}`, orderData, {
            headers: { Authorization: `Bearer ${CLIENT_TOKEN}` }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Delhivery API Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || "Server Error" });
    }
};


// ✅ **Track Order**
export const trackOrder = async (req, res) => {
    try {
        const { waybill } = req.params;

        const response = await axios.get(`${DELHIVERY_API_URL}/api/v1/packages/json/?waybill=${waybill}`, {
            headers: { Authorization: `Token ${CLIENT_TOKEN}` }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || "Server Error" });
    }
};
