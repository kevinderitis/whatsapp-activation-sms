import { getUserById, addNumber, setPayment } from '../dao/userDAO.js';
import { createOrder, getOrderById } from '../dao/orderDAO.js';
import { createPaymentPreference } from './mpService.js';
import config from '../config/config.js';

export const getUserDataService = async userId => {
    try {
        const userData = await getUserById(userId);
        return userData;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};


export const addNumberService = async userId => {
    try {
        const userData = await addNumber(userId);
        return userData;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const hasSufficientBalance = async userId => {
    try {
        let user = await getUserDataService(userId);
        let response = user.balance > Number(config.SMS_VALUE_ARS);
        return response;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const setPaymentReceived = async (orderId, amount) => {
    try {
        let order = await getOrderById(orderId);
        let userId = order.userId;
        let response = await setPayment(userId, amount);
        return response;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}

export const topUpBalanceService = async (userId, amount) => {
    try {
        let order = await createOrder(userId, amount);
        let url = await createPaymentPreference(amount, order.id);
        return url;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}
