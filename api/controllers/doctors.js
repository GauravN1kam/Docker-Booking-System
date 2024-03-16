const Docter = require('../models/doctors');

const getDoctors = async (req, res) => {
    try {
        const doctors = await Docter.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
    
 const createDoctor = async (req, res) => {
    const doctor = req.body;
    const newDoctor = new Docter(doctor);
    try {
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

 const getDoctorById = async (req, res) => {
    try {
        const doctor = await Docter.findById(req.params.id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

 const updateDoctor = async (req, res) => {
    const doctor = req.body;
    try {
        const updatedDoctor = await Docter.findByIdAndUpdate(req.params.id, doctor, { new: true });
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

 const deleteDoctor = async (req, res) => {
    try {
        await Docter.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}