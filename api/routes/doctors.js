const express = require('express');
const router = express.Router();
const { getDoctors, createDoctor, getDoctorById, updateDoctor, deleteDoctor} = require('../controllers/doctors');

// Define doctor-related routes and their handlers

router.
    get('/', getDoctors).
    post('/', createDoctor).
    get('/:id', getDoctorById).
    patch('/:id', updateDoctor).
    delete('/:id', deleteDoctor);

module.exports = router;