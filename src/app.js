import express from 'express';
import mongoose from 'mongoose';
import setRouters from './routes/router.js';

const mongoConnect = async () => {
    const database = 'futura';
    await mongoose.connect(
        `mongodb+srv://rodri:rodri@cluster0.fhf3wmo.mongodb.net/${database}?retryWrites=true&w=majority`
    );
    console.log('☁ MongoDB connected');
};

mongoConnect();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
setRouters(app);

const httpServer = app.listen(PORT, () => {
    console.log(`🚀 HTTP server is now running on http://localhost:${PORT}`);
});
