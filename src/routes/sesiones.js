import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    res.json({
        sessionId: req.session.id,
        isLogged: req.session.isLogged || false,
        session: req.session,
        cookies: req.cookies || {},
    });
    // res.cookie('prueba', 'Rodri');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin' && password === 'admin') {
        req.session.idUsuario = '6513a457bed50d37c2a7910a';
        req.session.isLogged = true;
        res.json({ ok: true });
    } else {
        res.json({ ok: false });
    }
});

export default router;
