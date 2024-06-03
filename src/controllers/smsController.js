import { getNumberService, receiveSMSService, cancelOrderService } from "../services/smsService.js";
import { createNumberService, updateNumberStatusToSentService } from "../services/numberServices.js";
import { hasSufficientBalance } from "../services/userService.js";
import config from "../config/config.js";

export const getNumber = async (req, res) => {
    let user = req.session.user ? req.session.user : req.user;
    try {
        let balanceValidation = await hasSufficientBalance(user._id);
        if (balanceValidation) {
            // let response = await getNumberService(config.AR_COUNTRY_CODE, config.WPP_SERVICE_CODE);
            // let newNumber = await createNumberService(user._id, response.phoneNumber, response.orderId);
            let newNumber = await createNumberService(user._id, '9876544321', '1234567');
            let response = {
                statusCode: 200,
                data: {
                    orderId: '1234567',
                    phoneNumber: '9876544321',
                    countryCode: 'AR',
                    orderExpireIn: 600
                }
            }
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
    let messageReceived = false;
    let response;
    try {
        // while (retries < maxRetries && !messageReceived) {
        //     response = await receiveSMSService(orderId);
        //     messageReceived = response.sms.code;
        //     if (!messageReceived) {
        //         retries++;
        //         await new Promise(resolve => setTimeout(resolve, 5000));
        //     }
        // }

        // if (messageReceived) {
        //     await updateNumberStatusToSentService(orderId);
        //     res.status(201).send(response);
        // } else {
        //     throw new Error('No se pudo recibir el mensaje después de varios intentos.');
        // }
        await updateNumberStatusToSentService(orderId);
        let response = {
            statusCode: 200,
            data: {
                sms: {
                    code:'982909'
                },
                orderId: "1234567",
                orderExpireIn: 600
            }
        }
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