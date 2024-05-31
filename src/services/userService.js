import { getUserById, setPayment } from '../dao/userDAO.js';
import { createOrder, getOrderById } from '../dao/orderDAO.js';
import { createPaymentPreference } from './mpService.js';
import { getActiveNumberByUserId } from '../dao/numberDAO.js';
import config from '../config/config.js';

export const getUserDataService = async userId => {
    try {
        const user = await getUserById(userId);
        const number = await getActiveNumberByUserId(userId);
        let userData = {
            _id: user.id,
            balance: user.balance,
            email: user.email,
            phoneNumber: number.phoneNumber,
            orderId: number.orderId
        };
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
