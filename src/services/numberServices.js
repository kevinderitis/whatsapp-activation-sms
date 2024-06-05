import { createNumber, updateNumberStatusToSent, updateNumberStatusToCanceled } from "../dao/numberDAO.js";
import { refundBalanceService } from "./userService.js";

export const createNumberService = async (userId, phoneNumber, orderId) => {
    try {
        let response = await createNumber(userId, phoneNumber, orderId);
        return response;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const updateNumberStatusToSentService = async orderId => {
    try {
        let response = await updateNumberStatusToSent(orderId);
        return response;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}

export const updateNumberStatusToCanceledService = async orderId => {
    try {
        await updateNumberStatusToCanceled(orderId);
        await refundBalanceService(orderId);
        return response;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}