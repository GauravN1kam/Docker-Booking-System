const Appointment = require('../models/appointments');
const Doctor = require('../models/doctors');


const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createAppointment = async (req, res) => {
    const appointment = req.body;
    const { doctorId } = appointment;
    const newAppointment = new Appointment(appointment);
    try {
        const isDocter = await Doctor.findById(doctorId)
        if (!isDocter) {
            res.status(404).json({ message: "No Docter Found" });
        }

        if (isDocter.numOfAppointments >= 0)
        {
            const newApp = isDocter.numOfAppointments - 1;
            console.log(newApp);
            await Doctor.findByIdAndUpdate(isDocter._id,{numOfAppointments: newApp}, {new : true});
        }
        else
        {
            res.json({message: "No Appoinments left"})
        }
        
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateAppointment = async (req, res) => {
    const appointment = req.body;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, appointment, { new: true });
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const ID = req.params.id
        const Appoint = await Appointment.findById(ID);

        const doctor = await Doctor.findById(Appoint.doctorId);
        if (!doctor) res.json({ message: "No Appoinment Found for this doctor" })
        
        const newApp = doctor.numOfAppointments + 1;
        console.log(newApp);
        await Doctor.findByIdAndUpdate(doctor._id,{numOfAppointments: newApp}, {new : true});
        
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
    getAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}