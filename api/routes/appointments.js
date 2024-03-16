const express = require('express');
const Approuter = express.Router();
const {
        getAppointments,
        createAppointment,
        getAppointmentById,
        updateAppointment,
        deleteAppointment
    }
    = require('../controllers/appointments');

// Define appointment-related routes and their handlers

Approuter.
    get('/', getAppointments).
    post('/', createAppointment).
    get('/:id', getAppointmentById).
    put('/:id', updateAppointment).
    delete('/:id', deleteAppointment);


module.exports = Approuter;