import { getNumberService, receiveSMSService, cancelOrderService } from "../services/smsService.js";
import { hasSufficientBalance } from "../services/userService.js";
import config from "../config/config.js";

export const getNumber = async (req, res) => {
    let user = req.session.user ? req.session.user : req.user;
    try {
        if (hasSufficientBalance(user._id)) {
            let response = await getNumberService(config.AR_COUNTRY_CODE, config.WPP_SERVICE_CODE);
            res.status(201).send(response);
        }else{
            res.status(402).send({ status: 'payment required' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const receiveSMS = async (req, res) => {
    const { orderId } = req.params;
    try {
        let response = await receiveSMSService(orderId);
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        let response = await cancelOrderService(orderId);
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};