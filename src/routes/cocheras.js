import { Router } from 'express';
import CocheraManager from '../controllers/cocheras.js';

const router = Router();
const cm = new CocheraManager();

router.get('/', async (req, res) => {
    const cocheras = await cm.obtenerTodos();
    res.send(cocheras);
});

router.get('/delPropietario', async (req, res) => {
    const usuario = req.session.idUsuario;
    const cocheras = await cm.obtenerPorPropietario(usuario);
    res.json(cocheras);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cochera = await cm.obtenerPorId(id);
    res.send(cochera);
});

router.get('/propietario/:id', async (req, res) => {
    const { id } = req.params;
    const cocheras = await cm.obtenerPorPropietario(id);
    res.send(cocheras);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creada = await cm.crear(datos);
    res.send(creada);
});

router.put('/:id', async (req, res) => {
    console.log('Se llamó a este endpoint');
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
