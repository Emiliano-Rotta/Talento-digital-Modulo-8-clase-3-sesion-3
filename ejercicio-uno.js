// Consigna
// Crea una API REST básica utilizando Express en Node.js que permita practicar los códigos de estado HTTP más comunes. Implementa las siguientes rutas y funcionalidades:

// Requisitos:
// Rutas principales:
// GET /success
// Responde con un código de estado 200 OK y un mensaje indicando que la solicitud fue exitosa.
// POST /created
// Responde con un código de estado 201 Created y un mensaje indicando que un recurso fue creado.
// GET /not-found
// Responde con un código de estado 404 Not Found y un mensaje indicando que el recurso no fue encontrado.
// GET /error
// Responde con un código de estado 500 Internal Server Error y un mensaje indicando que hubo un error en el servidor.


const express = require('express')
const app = express()
const PORT = 3000

app.get('/success',(req, res)=>{
    res.status(200).json({code: 200, message: 'La solicitud fue exitos'})
})

app.post('/created',(req, res)=>{
    res.status(201).json({code: 201, message: 'La solicitud fue creada exitosamente'})
})
app.get('/not-found',(req, res)=>{
    res.status(404).json({code: 404, message: 'El recurso no fue encontrado'})
})
app.get('/error',(req, res)=>{
    res.status(500).json({code: 500, message: 'Error interno en el servidor'})
})
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});