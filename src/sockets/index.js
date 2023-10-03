import { Server } from 'socket.io';

const configIO = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
};

export default (httpServer) => {
    const io = new Server(httpServer, configIO);

    io.on('connection', async (socket) => {
        console.log('[Chat] New connection', socket.id);

        socket.on('unirseChat', (publicacion) => {
            socket.join(publicacion);
            // console.log(socket.id + ' se ha unido al chat ' + publicacion);
            // TODO Mandar todos los mensajes al unirse...
        });

        // Enviar un mensaje al chat de la publicación
        socket.on('crearMensaje', (publicacion, usuario, mensaje) => {
            io.to(publicacion).emit('nuevoMensaje', usuario, mensaje);
        });

        socket.on('escribiendo', async (publicacion, user) => {
            io.to(publicacion).emit('mostrarEscribiendo', user, 1);
        });

        socket.on('noEscribiendo', async (publicacion, user) => {
            io.to(publicacion).emit('mostrarEscribiendo', user, -1);
        });
    });
};
