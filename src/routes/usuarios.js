import { Router } from 'express';
import UsuarioManager from '../controllers/usuarios.js';

const router = Router();
const um = new UsuarioManager();

router.get('/', async (req, res) => {
    const usuarios = await um.obtenerTodos();
    res.send(usuarios);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = await um.obtenerPorId(id);
    res.send(usuario);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creado = await um.crear(datos);
    res.send(creado);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const actualizado = await um.actualizar(id, datos);
    res.send(actualizado);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminado = await um.eliminar(id);
    res.send(eliminado);
});

export default router;
