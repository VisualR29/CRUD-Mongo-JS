# CRUD de Alumnos

## 📌 Descripción

Este proyecto es una aplicación web que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) de alumnos. La aplicación está construida utilizando Node.js, Express y MongoDB en el backend, y HTML, CSS y JavaScript en el frontend.

## 🚀 Características

* Registro de alumnos (nombre, apellido, teléfono, correo electrónico).
* Edición de alumnos existentes.
* Eliminación de alumnos.
* Búsqueda de alumnos por nombre y apellido.
* Validación de correo electrónico único para evitar duplicados.
* Diseño moderno y responsivo.

## 📦 Tecnologías utilizadas

* Frontend:

  * HTML5
  * CSS3
  * JavaScript (Vanilla)
* Backend:

  * Node.js
  * Express.js
  * MongoDB con Mongoose

## 📁 Estructura del proyecto

```
📁 backend
├── models
│   └── alumno.js
├── routes
│   └── alumnos.js
└── server.js

📁 frontend
├── index.html
├── styles.css
└── app.js
```

## ⚡ Instalación y ejecución

1. Clona este repositorio:

```bash
 git clone https://github.com/VisualR29/CRUD-Mongo-JS.git
```

2. Accede a la carpeta del proyecto:

```bash
cd crud-alumnos
```

3. Instala las dependencias del backend:

```bash
npm install
```

4. Configura la conexión a MongoDB en `server.js`:

```javascript
mongoose.connect('mongodb://localhost:27017/crudAlumnos')
```

5. Inicia el servidor:

```bash
npx nodemon backend/server.js
```

6. Abre el archivo `index.html` en tu navegador para usar la aplicación.
