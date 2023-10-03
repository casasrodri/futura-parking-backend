import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        publicacion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'publicaciones',
            required: true,
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true,
        },
        mensaje: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('mensajes', schema);
