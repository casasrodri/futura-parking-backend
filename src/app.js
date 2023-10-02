import express from 'express';
import mongoose from 'mongoose';
import setRouters from './routes/index.js';
import consoleActivity from './middlewares/console.js';
import cors from 'cors';
import sessionMiddleware from './middlewares/session.js';
import cookieParser from 'cookie-parser';

// Conexión con Mongo Atlas
const mongoConnect = async () => {
    await mongoose.connect(
        `mongodb+srv://rodri:rodri@cluster0.fhf3wmo.mongodb.net/futura?retryWrites=true&w=majority`
    );
    console.log('🧭 MongoDB conectado.');
};
mongoConnect();

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use('/', express.static(process.cwd() + '/public/dist'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use(consoleActivity({ ip: false, color: true, body: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: true, // Cambia esto a la URL de tu aplicación Vue.js
        credentials: true, // Habilita el intercambio de cookies
    })
);

// HTTP Server
const httpServer = app.listen(PORT, () => {
    console.log(`🚀 HTTP server disponible en http://localhost:${PORT}`);
});

// Routers
setRouters(app);
