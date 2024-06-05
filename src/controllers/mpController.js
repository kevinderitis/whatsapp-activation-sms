import { setPaymentReceived } from "../services/userService.js";
import { getPaymentByReference } from "../services/mpService.js";

export const receivePayment = async (req, res) => {
    let paymentId = req.body.data ? req.body.data.id : '';
    
    if (!paymentId) {
        return res.status(400).send({ error: 'Missing payment ID' });
    }

    try {
        let payment = await getPaymentByReference(paymentId)
        if (payment.status === 'approved') {
            let response = await setPaymentReceived(payment.external_reference, payment.transaction_amount);
            res.send({ status: 'ok', response })
        }


    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};