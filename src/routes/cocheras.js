import { Router } from 'express';
import CocheraManager from '../controllers/cocheras.js';

const router = Router();
const cm = new CocheraManager();

router.get('/', async (req, res) => {
    const cocheras = await cm.obtenerTodos();
    res.send(cocheras);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cochera = await cm.obtenerPorId(id);
    res.send(cochera);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creada = await cm.crear(datos);
    res.send(creada);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const actualizada = await cm.actualizar(id, datos);
    res.send(actualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminada = await cm.eliminar(id);
    res.send(eliminada);
});

export default router;
