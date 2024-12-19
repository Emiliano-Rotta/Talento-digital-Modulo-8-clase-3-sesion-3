const logger = (req, res, next) => {
    const time = new Date().toISOString(); // Obtiene la fecha y hora actuales en formato ISO.
    console.log(`[${time}] ${req.method} ${req.url}`); // Registra el método HTTP (GET, POST, etc.) y la URL solicitada.
    next(); // Llama a `next()` para continuar con la siguiente función middleware o la ruta correspondiente.
};

module.exports = logger;