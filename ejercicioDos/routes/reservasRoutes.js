const express = require('express');
const {
    obtenerReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva,
} = require('../controllers/reservasController');

const router = express.Router();

router.get('/', obtenerReservas);
router.post('/', crearReserva);
router.put('/:id', actualizarReserva);
router.delete('/:id', eliminarReserva);

module.exports = router;

