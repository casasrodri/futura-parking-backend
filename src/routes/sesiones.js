import { Router } from 'express';

const router = Router();

router.get('/logged', async (req, res) => {
    // console.log(req.sessionID);
    // console.log(req.session);
    res.json(req.session.isLogged);
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
