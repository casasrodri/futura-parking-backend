import { Router } from 'express';
import Conversacion from '../models/conversacion.js';

const router = Router();

router.post('/', async (req, res) => {
    const datos = req.body;
    const creada = await Conversacion.create(datos);
    res.json(creada);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const conversacion = await Conversacion.findById(id).populate(
        'publicacion oferente demandante'
    );
    res.json(conversacion);
});

export default router;
