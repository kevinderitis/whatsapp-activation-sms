import { getNumberService, receiveSMSService, cancelOrderService } from "../services/smsService.js";
import { createNumberService, updateNumberStatusToSentService, updateNumberStatusToCanceledService } from "../services/numberServices.js";
import { hasSufficientBalance, chargeNumberService } from "../services/userService.js";
import config from "../config/config.js";

export const getNumber = async (req, res) => {
    let user = req.session.user ? req.session.user : req.user;
    try {
        let balanceValidation = await hasSufficientBalance(user._id);
        if (balanceValidation) {
            let response = await getNumberService(config.AR_COUNTRY_CODE, config.WPP_SERVICE_CODE);
            await createNumberService(user._id, response.data.phoneNumber, response.data.orderId);
            let newbalance = await chargeNumberService(user._id);
            response.data.newBalance = newbalance;
            res.status(201).send(response);
        } else {
            res.status(402).send({ status: 'payment required' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const receiveSMS = async (req, res) => {
    const { orderId } = req.params;
    const maxRetries = 10;
    let retries = 0;
    let messageReceived;
    let response;
    try {
        while (retries < maxRetries && !messageReceived) {
            response = await receiveSMSService(orderId);
            if (!response) {
                await updateNumberStatusToCanceledService(orderId);
                return res.status(401).send({ error: 'Numero no disponible' })
            }

            if (response.statusCode === 200) {
                messageReceived = response.data.sms.code;
            } else {
                retries++;
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        if (messageReceived) {
            await updateNumberStatusToSentService(orderId);
            console.log(response)
            res.status(201).send(response);
        } else {
            await cancelOrderService(orderId);
            await updateNumberStatusToCanceledService(orderId);
            res.status(502).send(response);
        }

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