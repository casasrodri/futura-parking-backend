import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    res.json({
        sessionId: req.session.id,
        isLogged: req.session.isLogged || false,
        session: req.session,
        cookies: req.cookies || {},
        usuario: req.session.idUsuario || null,
        nombre: req.session.nombre || null,
    });
    // res.cookie('prueba', 'Rodri');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin' && password === 'admin') {
        req.session.idUsuario = '6513a457bed50d37c2a7910a';
        req.session.nombre = 'admin';
        req.session.isLogged = true;
        res.json({ ok: true });
    } else {
        res.json({ ok: false });
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Logout error',
                data: { err },
            });
        }
    });

    res.status(200).send({
        status: 'ok',
        message: 'Logout successfull',
        data: {},
    });
});

export default router;
