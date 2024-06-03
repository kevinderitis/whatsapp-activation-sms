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

const updateNumberStatusToSent = async (orderId) => {
    try {
        const updatedNumber = await Number.findOneAndUpdate(
            { orderId: orderId },
            { status: 'sent' },
            { new: true }
        );
        if (!updatedNumber) {
            console.error('No se encontró un número con el orderId proporcionado.');
        }
        console.log('Estado del número actualizado exitosamente a "sent":', updatedNumber);
        return updatedNumber;
    } catch (error) {
        console.error('Error al actualizar el status del número:', error.message);
        throw new Error('No se pudo actualizar el status del número');
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
        console.log('Números encontrados:', number);
        return number;
    } catch (error) {
        console.error('Error al obtener los números:', error.message);
        throw new Error('No se pudo obtener los números');
    }
};



export { createNumber, getNumberByOrderId, getActiveNumberByUserId, updateNumberStatusToSent };