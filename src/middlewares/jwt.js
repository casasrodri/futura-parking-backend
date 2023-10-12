// import jwt from 'jsonwebtoken';
import { verificarToken } from '../utils/jwt.js';
import UsuarioManager from '../controllers/usuarios.js';

const um = new UsuarioManager();

export default (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ mensaje: 'No se ha enviado el token.' });
    }

    let token;
    try {
        token = req.headers.authorization.split(' ')[1];
    } catch (error) {
        res.status(401).json({
            mensaje: 'No se ha enviado el token correctamente.',
        });
    }

    verificarToken(token, async (error, decoded) => {
        if (error) {
            res.status(401).json({ mensaje: 'Token inválido' });
        } else {
            const idUser = decoded.usuario;

            if (idUser === '4dm1n') {
                req.usuario = {
                    _id: '4dm1n',
                    nombre: 'admin',
                };
                return next();
            }

            const usuario = await um.obtenerPorId(idUser);
            req.usuario = usuario;
            delete req.usuario.password;

            next();
        }
    });
};
