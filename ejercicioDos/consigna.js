// Implementa una API RESTful para gestionar un sistema de reservas de mesas en un restaurante.

// La API debe cumplir con los siguientes requisitos:
// Rutas y métodos:
// GET /reservas
// Devuelve todas las reservas existentes en formato JSON.

// POST /reservas
// Permite crear una nueva reserva.
// Datos requeridos:
// Nombre del cliente (nombre): No puede estar vacío.
// Fecha de la reserva (fecha): Debe ser una fecha válida.
// Número de personas (personas): Debe ser un número positivo.

// PUT /reservas/:id
// Permite actualizar una reserva existente por su ID.
// Requisitos: Valida los mismos datos que para crear una reserva.

// DELETE /reservas/:id
// Permite eliminar una reserva existente por su ID.

// Requisitos técnicos:
// Los IDs de las reservas deben manejarse como parámetros de ruta (:id).

// Usa códigos de respuesta HTTP estándar y personalizados:
// 200 OK: Respuesta exitosa.
// 201 Created: Reserva creada correctamente.
// 204 No Content: Eliminación exitosa sin cuerpo de respuesta.
// 404 Not Found: La reserva no existe.
// 422 Unprocessable Entity: Datos inválidos en la solicitud.

// Middleware obligatorio:

// Registro de solicitudes:
// Implementa un middleware para registrar en la consola cada solicitud recibida, mostrando método, URL y hora.
// Procesamiento de JSON:

// Usa body-parser para procesar las solicitudes con cuerpo JSON.

// Estructura del proyecto:

// Organiza el código en las siguientes carpetas:
// controllers/: Funciones que manejan la lógica de cada endpoint.
// routes/: Define las rutas de la API.
// models/: Estructura de datos de las reservas.
// data/: Archivo para almacenar temporalmente los datos de las reservas.
// middlewares/: Middleware personalizado para el registro de solicitudes.
// server.js: Archivo principal para inicializar el servidor.


// ├── controllers/
// │   └── reservasController.js
// ├── data/
// │   └── reservas.js
// ├── middlewares/
// │   └── logger.js
// ├── models/
// │   └── reservaModel.js
// ├── routes/
// │   └── reservasRoutes.js
// ├── server.js
// ├── package.json


