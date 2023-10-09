import Mensaje from '../models/mensaje.js';

export default class MensajeManager {
    async crear(msj) {
        const { conversacion, usuario, mensaje } = msj;
        console.log(conversacion, usuario, mensaje);

        if (!conversacion || !usuario || !mensaje) {
            throw new Error('Faltan datos para crear el mensaje');
        }

        const creado = (await Mensaje.create(msj)).populate('usuario');
        return creado;
    }

    async marcarLeido(id, usuario) {
        const mensaje = await Mensaje.findById(id);
        if (!mensaje) {
            throw new Error('No se encontró el mensaje');
        }

        const yaLeido = mensaje.lecturas.filter((l) => l.usuario === usuario);
        if (yaLeido) {
            return mensaje;
        }

        const lectura = {
            usuario,
            fecha: new Date(),
        };

        mensaje.lecturas.push(lectura);
        await mensaje.save();
        return mensaje;
    }

    async obtenerTodosPorConversacion(conversacion) {
        const mensajes = await Mensaje.find({ conversacion }).populate(
            'usuario'
        );
        return mensajes;
    }

    async obtenerPorId(id) {
        const mensaje = await Mensaje.findById(id).populate('propietario');
        return mensaje;
    }
}
