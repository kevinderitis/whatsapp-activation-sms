import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from './src/config/passport.js';
import smsRouter from './src/routes/smsRouter.js';
import authRouter from './src/routes/authRouter.js';
import userRouter from './src/routes/userRouter.js';
import mpRouter from './src/routes/mpRouter.js';
import config from './src/config/config.js';

const app = express();
const PORT = config.PORT;

app.use(cors({
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use(session({
    secret: config.SECRET_PASSPORT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/sms', smsRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/mp', mpRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

server.on('error', error => console.log(error))