import { setPaymentReceived } from "../services/userService.js";

export const receivePayment = async (req, res) => {
// agregar logica para validar que el pago es de mp
    let payment = req.body;
    try {
        let response = await setPaymentReceived(payment.external_reference, payment.amount); // controlar que sea asi
        res.send({ status: 'ok', response })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};