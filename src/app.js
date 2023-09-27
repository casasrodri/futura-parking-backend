import express from 'express';
import mongoose from 'mongoose';
import setRouters from './routes/router.js';

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
app.use('/', express.static(process.cwd() + '/public'));

// HTTP Server
const httpServer = app.listen(PORT, () => {
    console.log(`🚀 HTTP server disponible en http://localhost:${PORT}`);
});

// Routers
setRouters(app);

app.get('/', async (req, res) => {
    res.sendFile('./public/index.html', { root: './' });
});
