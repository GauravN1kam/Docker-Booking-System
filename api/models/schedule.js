const { Schema, model } = require('mongoose');

const Schedule = new Schema({
  doctorId: String,
  patientName: String,
  startTime: Schema.Types.Date,
  endTime: Schema.Types.Date
});

const ScheduleSchema = model('Schedule', Schedule);

module.exports = ScheduleSchema;

