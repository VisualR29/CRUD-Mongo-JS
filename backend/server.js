import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import alumnosRoutes from './routes/alumnos.js';

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/crudAlumnos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/alumnos', alumnosRoutes);

// Manejo de errores (Página no encontrada)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
