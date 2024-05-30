import { getUserDataService, addNumberService } from "../services/userService.js";
import config from "../config/config.js";

export const getUserData = async (req, res) => {
    let user = req.session.user ? req.session.user : req.user;
    try {
        let response = await getUserDataService(user._id);
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const addNumber = async (req, res) => {
    let user = req.session.user ? req.session.user : req.user;
    try {
        let response = await addNumberService(user._id);
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const topUpBalance = async (req, res) => {
    let user = req.session.user ? req.session.user : req.user;
    let { amount } = req.body;
    try {
        let response = await topUpBalanceService(user._id, amount);
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
