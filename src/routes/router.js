import usuariosRouter from './usuarios.js';
import cocherasRotuer from './cocheras.js';

export default (app) => {
    // app.use('/', viewsRouter);
    app.use('/api/usuarios', usuariosRouter);
    app.use('/api/cocheras', cocherasRotuer);
};
