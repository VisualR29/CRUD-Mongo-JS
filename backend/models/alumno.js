import mongoose from 'mongoose';

const alumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: String,
  email: { type: String, required: true, unique: true, index: true }
});

alumnoSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('Alumno', alumnoSchema);
