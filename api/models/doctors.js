const { Schema, model } = require('mongoose');

const doctorSchema = new Schema({
  name: String,
  location: String,
  numOfAppointments: Number,
});

const Doctor = model('Doctor', doctorSchema);

module.exports = Doctor;
