const Schedule = require("../models/schedule");
const Doctor = require("../models/doctors");
const Appoinment = require("../models/appointments");

const getAllSchedule = async (req, res) => {
  try {
    const allappointments = await Schedule.find();

    res.status(200).json(allappointments);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const Id = req.params.id;
    const ScheduleSpecific = await Schedule.findById(Id);

    res.status(200).json(ScheduleSpecific);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const AddSchedule = async (req, res) => {
  const { doctorId, AppointmentId, patientName, startTime, endTime } = req.body;
  const data = req.body;
  const newSchedule = new Schedule(data);
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ msg: "Doctor Not Found" });
    }
    if (doctor.numOfAppointments > 0) {
      const newLeft = doctor.numOfAppointments - 1;
      const d = new Date(startTime);
      const de = new Date(endTime);
      if (d.getDay() == 0) {
        res.status(406).json({ msg: "No doctor work on sunday" });
      }
      const doctorSchedule = await Schedule.find({ doctorId: doctor._id });

      doctorSchedule.forEach((docI) => {
        if (
          (d > docI.startTime && d < docI.endTime) ||
          (de > docI.startTime && de < docI.endTime) ||
          (d < docI.startTime && de > docI.endTime)
        ) {
          res.json({ msg: "No Time for this appointment" });
        }
      });

      await Doctor.findByIdAndUpdate(
        doctor._id,
        { numOfAppointments: newLeft },
        { new: true }
      );
    } else {
      res.json({ msg: "No Appointment Slots Left" });
    }
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const UpdateSchedule = async (req, res) => {
  const Id = req.params.id;
  const edits = req.body;
  try {
    



    const updatedSchedule = await Schedule.findByIdAndUpdate(Id, edits, {
      new: true,
    });
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const DeleteSchedule = async (req, res) => {
  const Id = req.params.id;
  try {
    const schedule = await Schedule.findById(Id);
    const doc = await Doctor.findById(schedule.doctorId);
    const newLeft = doc.numOfAppointments + 1;
    await Doctor.findByIdAndUpdate(
      doc._id,
      { numOfAppointments: newLeft },
      { new: true }
    );
    await Schedule.findByIdAndDelete(Id);
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  getAllSchedule,
  getScheduleById,
  UpdateSchedule,
  DeleteSchedule,
  AddSchedule,
};
