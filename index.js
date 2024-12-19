// const express = require('express')
// const bodyParser = require('body-parser');


// const app = express();
// const PORT = 3000

// app.use(bodyParser.json()) //es necesario si usamos rutas post o put

// app.post('/registro', (res, res)=>{
//     const { nombre, email } = req.body
//     if(!nombre || !email){
//         return res.status(400).json({error: "Nombre y email son obligatorios"})
//     }
//     return res.status(201).json({mensage: "Usuario registrado", datos: {
//         nombre, email
//     }})
// })

// app.listen(PORT, () =>{
//     console.log(`Servidor levantado en puerto: ${PORT}`)
// })

//Codigo de respuesta HTTP
// 1xx (informativos) la info fue recibida y se esta procesando 
// 2xx Exito La solicitud se conpleto exitosamente
// 3xx redireccion, cuando tengo que realizar alguna otra accion par acompletar la solicitud
// 4xx errores del cliente
// 5xx (errores del servidor)

// 1xx (Informativos)
// 100 Continue: El cliente puede continuar enviando su solicitud.
// 102 Processing: El servidor está procesando la solicitud.

// 2xx (Éxito)
// 200 exito al recibir
// 201 Created: Indica que un recurso ha sido creado exitosamente.
// 204 No Content: Indica éxito pero no devuelve contenido.

// 3xx (Redirección)
// 301 Moved Permanently: El recurso se ha movido permanentemente.
// 304 Not Modified: Indica que el recurso no ha cambiado y puede usarse la versión en caché.

// 4xx (Errores del cliente)
// 400 Bad Request: La solicitud tiene errores.
// 401 Unauthorized: Se requiere autenticación.
// 403 Forbidden: El cliente no tiene permiso para acceder.

// 5xx (Errores del servidor)
// 502 Bad Gateway: Error al comunicarse con otro servidor.
// 503 Service Unavailable: El servicio está temporalmente no disponible.

// const express = require('express')
// const bodyParser = require('body-parser');


// const app = express();
// const PORT = 3000

// app.use(bodyParser.json()) //es necesario si usamos rutas post o put

// app.post('/registro', (res, res)=>{
//     const { nombre, email } = req.body
//     if(!nombre || !email){
//         return res.status(400).json({error: "Nombre y email son obligatorios"}) //400 porque el cliente le falto subir datos
//     }
//     return res.status(201).json({mensage: "Usuario registrado", datos: {   //201 exito en cargar informacion
//         nombre, email 
//     }})
// })

// app.get('/exito', (req, res) => {
//     res.status(200).json({ mensaje: 'Todo salió bien' }); //exito en traer informacion
// });

// app.get('/recurso-no-encontrado', (req, res) => {
//     res.status(404).json({ error: 'Recurso no encontrado' }); //LA pagina que quiere entrar no existe
// });

// app.get('/error-servidor', (req, res) => {
//     res.status(500).json({ error: 'Error interno del servidor' });
// });

// app.get('/redireccion', (req, res) => {
//     res.status(301).json({ mensaje: 'El recurso se movió permanentemente' });
// });

// app.get('/error-servidor', (req, res) => {
//     res.status(503).json({ error: 'El servicio no está disponible' });
// });


// //codigos personalizados
// // En HTTP, los códigos de respuesta estándar cubren una gran cantidad de escenarios comunes, pero en algunas situaciones, los desarrolladores pueden necesitar más especificidad en la forma en que el servidor responde a ciertos tipos de solicitudes. Los códigos de respuesta personalizados permiten a los desarrolladores manejar casos particulares que no están cubiertos adecuadamente por los códigos estándar, o proporcionan una manera más precisa de informar al cliente sobre el estado de la solicitud. Estos códigos personalizados generalmente se utilizan junto con los códigos estándar existentes (como 4xx o 5xx), pero también pueden ser definidos según las necesidades del negocio.


// app.post('/custom-422', (req, res) => {
//     const { nombre, edad } = req.body
//     if(typeof edad !== Number){
//         return res.status(422).json({ error: 'Datos de edad no es válido.' });
//     }
    
// });



// app.listen(PORT, () =>{
//     console.log(`Servidor levantado en puerto: ${PORT}`)
// })



//----------------------------------
//codigo personalizado

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');

const PORT = 3000;

// Middleware para parsear cuerpos JSON
app.use(bodyParser.json());
app.use(logger)
// "base de datos"
const users = [
    { id: 1, name: 'Juan', role: 'user' },
    { id: 2, name: 'Ana', role: 'admin' },
];

// Simulación de límites de solicitudes
let requestCount = 0;
const REQUEST_LIMIT = 5;

// Middleware para contar solicitudes
app.use((req, res, next) => {
    requestCount++;
    if (requestCount > REQUEST_LIMIT) {
        return res.status(429).json({ 
            error: 'Too Many Requests.', 
            message: 'Has realizado muchas solicitudes, espera media hora.'
        });
    }
    next();
});

// Ruta para realizar un pago (solo accesible para administradores)
app.post('/pago', (req, res) => {
    const { userId, amount } = req.body;
    const user = users.find(u => u.id === userId);

    // Verificación de si el usuario tiene permisos de administrador
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ 
            error: 'Forbidden', 
            message: 'no puede realizar pagos porque no tiene los permisos de administrador.' 
        });
    }

    // Verificación de datos inválidos (monto no válido)
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(422).json({
            error: 'Unprocessable Entity',
            message: 'Los datos recibidos no son validos'
        });
    }

    // Simulando el proceso de pago exitoso
    res.status(200).json({
        message: 'Payment processed successfully',
        details: { userId, amount }
    });
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.status(200).json(users);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



//-----------------------------------------------------
// El middleware logger es útil para monitorear el comportamiento de la API. Te permite ver un registro en tiempo real de todas las solicitudes que llegan al servidor. Esto es especialmente útil para:

// const logger = (req, res, next) => {
//     const time = new Date().toISOString(); // Obtiene la fecha y hora actuales en formato ISO.
//     console.log(`[${time}] ${req.method} ${req.url}`); // Registra el método HTTP (GET, POST, etc.) y la URL solicitada.
//     next(); // Llama a `next()` para continuar con la siguiente función middleware o la ruta correspondiente.
// };

// module.exports = logger;



