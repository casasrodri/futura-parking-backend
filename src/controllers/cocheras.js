import Cochera from '../models/cochera.js';

export default class CocheraManager {
    async crear(cochera) {
        const { numero, tipo, propietario } = cochera;

        if (!numero || !tipo || !propietario) {
            throw new Error('Faltan datos');
        }

        const creado = await Cochera.create(cochera);
        return creado;
    }

    async obtenerTodos() {
        const cocheras = await Cochera.find();
        return cocheras;
    }

    async obtenerPorId(id) {
        const cochera = await Cochera.findById(id).populate('propietario');
        return cochera;
    }

    async actualizar(id, cochera) {
        const actualizado = await Cochera.findByIdAndUpdate(id, cochera, {
            new: true,
        });
        return actualizado;
    }

    async eliminar(id) {
        const eliminado = await Cochera.findByIdAndDelete(id);
        return eliminado;
    }
}
