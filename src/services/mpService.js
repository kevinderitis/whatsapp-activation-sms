import { MercadoPagoConfig, Preference } from 'mercadopago';
import axios from 'axios';
import config from '../config/config.js';

const client = new MercadoPagoConfig({ accessToken: config.MERCADOPAGO_ACCESS_TOKEN });

export const createPaymentPreference = async (amount, orderId) => {
    try {
        const productPrice = Number(amount);
        const preference = new Preference(client);
        const createdPref = await preference.create({
            body: {
                items: [{
                    title: config.MP_PRODUCT_TITLE,
                    unit_price: productPrice,
                    quantity: 1
                }],
                external_reference: orderId,
                notification_url: `${config.APP_DOMAIN}/mp/callback`,
                back_urls: {
                    success: config.BACK_SUCCESS_URL_MP
                }
            }
        });

        return createdPref.init_point;
    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        throw new Error('Error al procesar la solicitud');
    }
};

export const getPaymentByReference = async paymentId => {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${config.MERCADOPAGO_ACCESS_TOKEN}`;
    try {
        let response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        return null
    }
}