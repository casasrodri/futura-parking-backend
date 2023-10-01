import Publicacion from '../models/publicacion.js';

export default class PublicacionManager {
    async crear(publicacion) {
        const {
            tipo,
            creador,
            ini,
            fin,
            vencimiento,
            cochera,
            precio,
            vehiculo,
        } = publicacion;

        if (!tipo || !creador || !ini || !fin || !vencimiento) {
            throw new Error('Faltan datos');
        }

        if (tipo === 'demanda') {
            if (!vehiculo) {
                throw new Error('Faltan datos de la demanda.');
            }
        }

        if (tipo === 'oferta') {
            if (!cochera || !precio) {
                throw new Error('Faltan datos de la oferta.');
            }
        }

        const creado = await Publicacion.create(publicacion);
        return creado;
    }

    async obtenerTodos() {
        const publicaciones = await Publicacion.find();
        return publicaciones;
    }

    async obtenerPorId(id) {
        const publicacion = await Publicacion.findById(id).populate(
            'propietario'
        );
        return publicacion;
    }

    async actualizar(id, publicacion) {
        const actualizada = await Publicacion.findByIdAndUpdate(
            id,
            publicacion,
            {
                new: true,
            }
        );
        return actualizada;
    }

    async eliminar(id) {
        const eliminada = await Publicacion.findByIdAndDelete(id);
        return eliminada;
    }
}
