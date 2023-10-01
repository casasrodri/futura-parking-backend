import { Router } from 'express';
import PublicacionManager from '../controllers/publicaciones.js';

const router = Router();
const pm = new PublicacionManager();

router.get('/', async (req, res) => {
    const publicaciones = await pm.obtenerTodos();
    res.send(publicaciones);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const publicacion = await pm.obtenerPorId(id);
    res.send(publicacion);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creada = await pm.crear(datos);
    res.send(creada);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const actualizada = await pm.actualizar(id, datos);
    res.send(actualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminada = await pm.eliminar(id);
    res.send(eliminada);
});

export default router;
