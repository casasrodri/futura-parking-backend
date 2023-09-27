import usuariosRouter from './usuarios.js';
import cocherasRotuer from './cocheras.js';

export default (app) => {
    app.get('/', async (req, res) => {
        res.sendFile('./public/dist/index.html', { root: '.' });
    });
    app.use('/api/usuarios', usuariosRouter);
    app.use('/api/cocheras', cocherasRotuer);
};
