import { Router } from 'express';
import { generarToken } from '../utils/jwt.js';
import jwtAuth from '../middlewares/jwt.js';
import UsuarioManager from '../controllers/usuarios.js';

const router = Router();
const um = new UsuarioManager();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let usuario;

    if (email === 'admin' && password === 'admin') {
        usuario = {
            id: '4dm1n',
            nombre: 'admin',
        };
    }

    if (!usuario) {
        const usuarioExiste = await um.obtenerPorEmail(email);
        if (!usuarioExiste)
            return res.status(401).json({ error: 'Usuario no encontrado' });

        // FIXME Usar bcrypt
        const passwordOk = password === usuarioExiste.password;
        if (!passwordOk)
            return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Se construye el objeto de respuesta
        usuario = {
            id: usuarioExiste._id,
            nombre: usuarioExiste.nombre,
        };
    }

    // Creación del token
    usuario.token = `Bearer ${generarToken(usuario.id)}`;

    res.json(usuario);
});

router.get('/protected', jwtAuth, (req, res) => {
    res.json({
        mensaje: 'Hola mundo',
        usuario: req.usuario,
    });
});

export default router;
