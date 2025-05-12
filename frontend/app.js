let editingId = null;
let alumnosList = [];

// Cargar alumnos al iniciar
document.addEventListener('DOMContentLoaded', fetchAlumnos);

// Manejar formulario
document.getElementById('alumnoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const alumno = {
    nombre: document.getElementById('nombre').value.trim(),
    apellido: document.getElementById('apellido').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    email: document.getElementById('email').value.trim()
  };

  const url = editingId ? `http://localhost:3000/alumnos/${editingId}` : 'http://localhost:3000/alumnos';
  const method = editingId ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al guardar');
    }

    fetchAlumnos();
    resetForm();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

// Obtener alumnos
async function fetchAlumnos() {
  try {
    const response = await fetch('http://localhost:3000/alumnos');
    alumnosList = await response.json();
    renderAlumnos(alumnosList);
  } catch (error) {
    console.error(error);
  }
}

// Mostrar lista
function renderAlumnos(alumnos) {
  const lista = document.getElementById('listaAlumnos');
  lista.innerHTML = alumnos.map(alumno => `
    <div class="alumno-item">
      <div>
        <strong>${alumno.nombre} ${alumno.apellido}</strong><br>
        <small>📞 ${alumno.telefono || 'N/A'} | ✉️ ${alumno.email}</small>
      </div>
      <div>
        <button onclick="editAlumno('${alumno._id}')">✏️ Editar</button>
        <button onclick="deleteAlumno('${alumno._id}')">🗑️ Eliminar</button>
      </div>
    </div>
  `).join('');
}

// Búsqueda de alumnos por nombre
function searchAlumno() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

  const filteredAlumnos = alumnosList.filter(alumno => {
    const fullName = `${alumno.nombre} ${alumno.apellido}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  renderAlumnos(filteredAlumnos);
}


// Editar alumno
window.editAlumno = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/alumnos/${id}`);
    const alumno = await response.json();

    if (!alumno) {
      alert('Alumno no encontrado');
      return;
    }

    document.getElementById('id').value = id;
    document.getElementById('nombre').value = alumno.nombre;
    document.getElementById('apellido').value = alumno.apellido;
    document.getElementById('telefono').value = alumno.telefono || '';
    document.getElementById('email').value = alumno.email;

    editingId = id;
    document.getElementById('submitButton').innerText = "Actualizar";
    document.getElementById('cancelButton').style.display = "inline";
  } catch (error) {
    console.error(error);
    alert('Error al cargar alumno');
  }
};

// Cancelar edición
function cancelEdit() {
  resetForm();
}

// Restablecer formulario
function resetForm() {
  document.getElementById('alumnoForm').reset();
  document.getElementById('submitButton').innerText = "Guardar";
  document.getElementById('cancelButton').style.display = "none";
  editingId = null;
}

// Eliminar alumno
window.deleteAlumno = async (id) => {
  if (!confirm('¿Eliminar este alumno?')) return;

  try {
    await fetch(`http://localhost:3000/alumnos/${id}`, { method: 'DELETE' });
    fetchAlumnos();
  } catch (error) {
    console.error(error);
    alert('Error al eliminar');
  }
};
