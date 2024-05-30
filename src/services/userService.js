import { getUserById, addNumber, setPayment } from '../dao/userDAO.js';
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
        return user.balance > Number(config.SMS_VALUE_ARS);
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const setPaymentReceived = async (userId, amount) => {
    try {
        let response = await setPayment(userId, amount);
        return response;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}