import axios from 'axios';
import config from '../config/config.js';

const getNumberService = async (countryCode, service) => {
    try {
        const response = await axios.get(`https://api.smspva.com/activation/number/${countryCode}/${service}`, {
            headers: { apikey: config.SMSPVA_API_KEY }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

const receiveSMSService = async (orderId) => {
    try {
        const response = await axios.get(`https://api.smspva.com/activation/sms/${orderId}`, {
            headers: { apikey: config.SMSPVA_API_KEY }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

const cancelOrderService = async (orderId) => {
    try {
        const response = await axios.put(`https://api.smspva.com/activation/cancelorder/${orderId}`, {
            headers: { apikey: config.SMSPVA_API_KEY }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export { getNumberService, receiveSMSService, cancelOrderService };
