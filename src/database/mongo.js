import mongoose from 'mongoose';

export const MONGO_DB_URI =
    // 'mongodb+srv://rodri:rodri@cluster0.fhf3wmo.mongodb.net/futura?retryWrites=true&w=majority';
    'mongodb://127.0.0.1:27017/';

export default async () => {
    await mongoose.connect(MONGO_DB_URI);
    console.log('🧭 MongoDB conectado.');
};
