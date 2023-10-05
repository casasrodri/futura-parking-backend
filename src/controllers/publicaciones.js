import Publicacion from '../models/publicacion.js';

const determinarSimilitud = (base, comparada) => {
    const iniCompartido = base.ini < comparada.ini ? comparada.ini : base.ini;
    const finCompartido = base.fin < comparada.fin ? base.fin : comparada.fin;

    // Datos en segundos
    const duracion1 = (base.fin - base.ini) / 1000;
    console.log(base.fin, base.ini, duracion1);
    const duracion2 = (comparada.fin - comparada.ini) / 1000;
    console.log(comparada.fin, comparada.ini, duracion2);
    const duracionCompartida = (finCompartido - iniCompartido) / 1000;
    console.log(duracionCompartida);
    console.log('------------');

    if (duracionCompartida <= 0) {
        return 0;
    }

    return duracionCompartida / duracion1;
};

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

    async obtenerSimilares(id) {
        // Endpoint: /api/publicaciones/similares/:id

        const publicacion = await this.obtenerPorId(id);
        const tipo = publicacion.tipo === 'oferta' ? 'demanda' : 'oferta';

        // Obtención de publicaciones disponibles del tipo contrario
        const publicaciones = await this.obtenerDisponibles(tipo);

        // Cálculo de similitud
        const publicacionObj = publicaciones.map((publ) => {
            const p = publ.toObject();
            p.similitud = determinarSimilitud(publicacion, p);
            return p;
        });

        // Filtrado de similitud y que no sean del mismo usuario
        const publicacionesSimilares = publicacionObj.filter((p) => {
            return (
                p.creador._id.toString() !=
                    publicacion.creador._id.toString() && p.similitud >= 0.5
            );
        });

        // Ordenamiento por similitud (descendente)
        publicacionesSimilares.sort((a, b) => {
            return b.similitud - a.similitud;
        });

        return publicacionesSimilares;
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
