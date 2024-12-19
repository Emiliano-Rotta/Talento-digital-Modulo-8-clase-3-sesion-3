const reservas = require('../data/reservas');
const Reserva = require('../models/reservaModel');

const obtenerReservas = (req, res) => {
    res.status(200).json(reservas);
};

const crearReserva = (req, res) => {
    const { nombre, fecha, personas } = req.body;
    
    if (!nombre || !fecha || !Number.isInteger(personas) || personas <= 0) {
        return res.status(422).json({ error: 'Datos inválidos' });
    }
    
    const nuevaReserva = new Reserva(
        reservas.length + 1,
        nombre,
        fecha,
        personas
    );
    reservas.push(nuevaReserva);
    res.status(201).json(nuevaReserva);
};

const actualizarReserva = (req, res) => {
    const { id } = req.params;
    const { nombre, fecha, personas } = req.body;
    const reserva = reservas.find(r => r.id === parseInt(id));
    
    if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    
    if (!nombre || !fecha || !Number.isInteger(personas) || personas <= 0) {
        return res.status(422).json({ error: 'Datos inválidos' });
    }

    reserva.nombre = nombre;
    reserva.fecha = fecha;
    reserva.personas = personas;
    
    res.status(200).json(reserva);
};

const eliminarReserva = (req, res) => {
    const { id } = req.params;
    const index = reservas.findIndex(r => r.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    
    reservas.splice(index, 1);
    res.status(204).send();
};

module.exports = {
    obtenerReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva,
};
