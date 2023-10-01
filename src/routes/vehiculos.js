import { Router } from 'express';
import VehiculoManager from '../controllers/vehiculos.js';

const router = Router();
const vm = new VehiculoManager();

router.get('/', async (req, res) => {
    const vehiculos = await vm.obtenerTodos();
    res.send(vehiculos);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const vehiculo = await vm.obtenerPorId(id);
    res.send(vehiculo);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creado = await vm.crear(datos);
    res.send(creado);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const actualizado = await vm.actualizar(id, datos);
    res.send(actualizado);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminado = await vm.eliminar(id);
    res.send(eliminado);
});

export default router;
