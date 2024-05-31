import Order from './models/orderModel.js';

import db from './db.js';

const createOrder = async (userId, amount) => {
    try {
        const newOrder = new Order({
            userId,
            amount
        });
        await newOrder.save();
        console.log('Orden creada exitosamente:', newOrder);
        return newOrder;
    } catch (error) {
        console.error('Error al crear la orden:', error.message);
        throw new Error('No se pudo crear el usuario');
    }
};

const getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('La orden no fue encontrada');
        }
        console.log('Orden encontrada:', order);
        return order;
    } catch (error) {
        console.error('Error al obtener la orden por ID:', error.message);
        throw new Error('No se pudo obtener la orden');
    }
};


export { createOrder, getOrderById };