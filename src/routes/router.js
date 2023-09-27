import usuariosRouter from './usuarios.js';

export default (app) => {
    // app.use('/', viewsRouter);
    app.use('/api/usuarios', usuariosRouter);
    // app.use('/api/carts', cartsRouter);
};
