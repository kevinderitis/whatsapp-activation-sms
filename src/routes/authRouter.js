import { Router } from 'express';
import passport from '../config/passport.js';
import { login, signup, logout, checklogin } from '../controllers/authController.js';

const authRouter = Router();

authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login.html' }),
    function (req, res) {
        res.redirect('/profile.html');
    });

authRouter.post('/login', login);

authRouter.post('/signup', signup);

authRouter.get('/logout', logout);

authRouter.get('/checkLoggedIn', checklogin);

export default authRouter;
