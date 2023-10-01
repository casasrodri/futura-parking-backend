import MongoStore from 'connect-mongo';
import session from 'express-session';

const MONGO_DB_URI =
    'mongodb+srv://rodri:rodri@cluster0.fhf3wmo.mongodb.net/futura?retryWrites=true&w=majority';

export default session({
    store: MongoStore.create({
        mongoUrl: MONGO_DB_URI,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 60 * 5,
    }),
    secret: 'sasaCogirdoRnairdA',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // Duración de la cookie de sesión en milisegundos (1 hora en este ejemplo)
    },
});
