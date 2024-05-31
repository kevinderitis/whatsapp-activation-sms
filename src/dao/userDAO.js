import User from './models/userModel.js';

import db from './db.js';

const createNewUser = async (name, email, password, phone) => {
    try {
        const newUser = new User({
            name,
            email,
            password,
            phone
        });
        await newUser.save();
        console.log('Usuario creado exitosamente:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
        throw new Error('No se pudo crear el usuario');
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        console.log('Usuarios encontrados:', users);
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        throw new Error('No se pudieron obtener los usuarios');
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        console.log('Usuario encontrado:', user);
        return user;
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        throw new Error('No se pudo encontrar el usuario');
    }
};

const updateUserById = async (userId, newData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, {
            new: true,
        });
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        console.log('Usuario actualizado:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar usuario por ID:', error.message);
        throw new Error('No se pudo actualizar el usuario');
    }
};

const updateUserPhoneByEmail = async (phone, email) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ email }, { phone }, {
            new: true,
        });
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        console.log('Usuario actualizado:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar usuario por ID:', error.message);
        throw new Error('No se pudo actualizar el usuario');
    }
};

const updateUserStateByEmail = async (state, email) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ email }, { state }, {
            new: true,
        });
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        console.log('Usuario actualizado:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar usuario por ID:', error.message);
        throw new Error('No se pudo actualizar el usuario');
    }
};

const deleteUserById = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('Usuario no encontrado');
        }
        console.log('Usuario eliminado:', deletedUser);
        return deletedUser;
    } catch (error) {
        console.error('Error al eliminar usuario por ID:', error.message);
        throw new Error('No se pudo eliminar el usuario');
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log('Usuario no encontrado')
        }
        return user;
    } catch (error) {
        console.error('Error al obtener usuario por correo electrónico:', error.message);
        throw new Error('No se pudo encontrar el usuario');
    }
};

const setPayment = async (id, amount) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $inc: { balance: amount } },
            { new: true }
        );
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        throw new Error('No se pudo actualizar el usuario');
    }
};


export { createNewUser, getAllUsers, getUserById, updateUserById, deleteUserById, getUserByEmail, updateUserPhoneByEmail, updateUserStateByEmail, setPayment };
