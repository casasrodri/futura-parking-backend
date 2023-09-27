import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema({
    numero: { type: Number, required: true },
    tipo: {
        type: String,
        required: true,
        enum: ['semi-cubierta', 'subterránea'],
    },
    propietario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
    },
});

// schema.plugin(mongoosePaginate);

export default mongoose.model('cocheras', schema);
