import express from 'express';
import Alumno from '../models/alumno.js';

const router = express.Router();

// Obtener todos los alumnos
router.get('/', async (req, res) => {
	try {
		const alumnos = await Alumno.find();
		res.json(alumnos);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener alumnos' });
	}
});

// Obtener un alumno por ID
router.get('/:id', async (req, res) => {
	try {
		const alumno = await Alumno.findById(req.params.id);
		if (!alumno) {
			return res.status(404).json({ error: 'Alumno no encontrado' });
		}
		res.json(alumno);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener el alumno' });
	}
});

// Crear alumno
router.post('/', async (req, res) => {
	try {
		const { email } = req.body;

		const existingAlumno = await Alumno.findOne({ email });
		if (existingAlumno) {
			return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
		}

		const alumno = new Alumno(req.body);
		await alumno.save();
		res.status(201).json(alumno);
	} catch (error) {
		if (error.code === 11000) {
			res.status(400).json({ error: 'El correo electrónico ya está registrado' });
		} else {
			res.status(400).json({ error: 'Error al crear alumno' });
		}
	}
});

// Actualizar alumno
router.put('/:id', async (req, res) => {
	try {
		const { email } = req.body;
		const { id } = req.params;

		const existingAlumno = await Alumno.findOne({ email, _id: { $ne: id } });
		if (existingAlumno) {
			return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
		}

		const alumno = await Alumno.findByIdAndUpdate(id, req.body, { new: true });
		if (!alumno) {
			return res.status(404).json({ error: 'Alumno no encontrado' });
		}

		res.json(alumno);
	} catch (error) {
		if (error.code === 11000) {
			res.status(400).json({ error: 'El correo electrónico ya está registrado' });
		} else {
			res.status(400).json({ error: 'Error al actualizar alumno' });
		}
	}
});

// Eliminar alumno
router.delete('/:id', async (req, res) => {
	try {
		await Alumno.findByIdAndDelete(req.params.id);
		res.json({ message: 'Alumno eliminado' });
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar alumno' });
	}
});

export default router;