const express = require('express');
const { json } = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { connect, default: mongoose } = require('mongoose');
const doctorRoutes = require('./api/routes/doctors');
const appointmentRoutes = require('./api/routes/appointments');
const ScheduleRoutes = require('./api/routes/schedule')

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup, database connection, and route registration
app.use(json());
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/schedule', ScheduleRoutes)

app.use('/', (req, res) => {
  res.send("<h1>Server Started Successfully</h1>")
})

const connecDB = mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(port, () => {
  connecDB.then(() => {
    console.log('MongoDB Connected');
  }).catch((err) => {
    console.log(err);
  });
  console.log(`Server is running on port ${port}`);
});
