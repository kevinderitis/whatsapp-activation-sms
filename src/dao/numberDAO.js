import Number from './models/numbersModel.js';

import db from './db.js';

const createNumber = async (userId, phoneNumber, orderId) => {
    try {
        const newNumber = new Number({
            userId,
            phoneNumber,
            orderId
        });
        await newNumber.save();
        console.log('Numero creado exitosamente:', newNumber);
        return newNumber;
    } catch (error) {
        console.error('Error al crear el numero:', error.message);
        throw new Error('No se pudo crear el numero');
    }
};

const getNumberByOrderId = async (orderId) => {
    try {
        const number = await Number.findOne({ orderId });
        if (!number) {
            throw new Error('El numero no fue encontrada');
        }
        console.log('Numero encontrada:', number);
        return number;
    } catch (error) {
        console.error('Error al obtener el numero:', error.message);
        throw new Error('No se pudo obtener el numero');
    }
};

const getActiveNumberByUserId = async (userId) => {
    try {
        const number = await Number.findOne({ userId, status: 'pending' }).sort({ createdAt: -1 });
        if (!number) {
            throw new Error('No se encontraron números con el estado pendiente para el usuario proporcionado');
        }
        console.log('Números encontrados:', number);
        return number;
    } catch (error) {
        console.error('Error al obtener los números:', error.message);
        throw new Error('No se pudo obtener los números');
    }
};



export { createNumber, getNumberByOrderId, getActiveNumberByUserId };