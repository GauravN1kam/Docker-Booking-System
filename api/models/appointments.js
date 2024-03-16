const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
  doctorId: Schema.Types.ObjectId,
  patientName: String,
  appointmentTime: String,
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;
