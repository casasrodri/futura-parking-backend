import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const usuariosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// productSchema.plugin(mongoosePaginate);

export default mongoose.model('usuarios', usuariosSchema);
