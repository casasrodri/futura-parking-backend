import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema(
    {
        tipo: {
            type: String,
            required: true,
            enum: ['oferta', 'demanda'],
        },
        creador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true,
        },
        ini: { type: Date, required: true },
        fin: { type: Date, required: true },
        vencimiento: { type: Date, required: true },
        observaciones: { type: String },
        estado: {
            type: String,
            required: true,
            enum: ['disponible', 'finalizada'], // FIXME: adaptar estados.
        },

        // Sólo para ofertas
        cochera: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cocheras',
        },
        precio: { type: Number },

        // Sólo para demandas
        vehiculo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vehiculos',
        },
    },
    { timestamps: true }
);

// schema.plugin(mongoosePaginate);

export default mongoose.model('publicaciones', schema);
