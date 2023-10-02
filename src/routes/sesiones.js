import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    res.json({
        sessionId: req.session.id,
        isLogged: req.session.isLogged || false,
        session: req.session,
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin' && password === 'admin') {
        req.session.user = { email };
        req.session.isLogged = true;
        res.json({ ok: true });
    } else {
        res.json({ ok: false });
    }
});

export default router;
