import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const httpServer = app.listen(PORT, () => {
    console.log(`HTTP server is now running on http://localhost:${PORT}`);
});
