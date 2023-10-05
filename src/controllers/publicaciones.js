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
        const publicaciones = await Publicacion.find()
            .populate('creador cochera vehiculo')
            .sort({
                createdAt: -1,
            });
        return publicaciones;
    }

    async obtenerDisponibles(tipo) {
        const publicaciones = await Publicacion.find({
            estado: 'disponible',
            tipo,
        })
            .populate('creador cochera vehiculo')
            .sort({
                createdAt: -1,
            });
        return publicaciones;
    }

    async obtenerPorId(id) {
        const publicacion = await Publicacion.findById(id).populate(
            'creador cochera vehiculo'
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
