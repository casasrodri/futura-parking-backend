import Usuario from '../models/usuario.js';

export default class UsuarioManager {
    async crear(usuario) {
        const { nombre, apellido, email, password } = usuario;

        if (!nombre || !apellido || !email || !password) {
            throw new Error('Faltan datos');
        }

        const creado = await Usuario.create(usuario);
        return creado;
    }

    async obtenerTodos() {
        const usuarios = await Usuario.find();
        return usuarios;
    }

    async obtenerPorId(id) {
        const usuario = await Usuario.findById(id);
        return usuario;
    }

    async obtenerPorEmail(email) {
        const usuario = await Usuario.findOne({ email });
        return usuario;
    }

    async actualizar(id, usuario) {
        const actualizado = await Usuario.findByIdAndUpdate(id, usuario, {
            new: true,
        });
        return actualizado;
    }

    async eliminar(id) {
        const eliminado = await Usuario.findByIdAndDelete(id);
        return eliminado;
    }
}
