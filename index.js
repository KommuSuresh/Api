const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy data for doctors
const doctors = [
  { id: 1, name: 'Dr. John Doe', specialty: 'General Physician', schedule: 'Evenings, Monday to Saturday', maxPatients: 10 },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', schedule: 'Evenings, Monday to Saturday', maxPatients: 8 },
  // Add more doctors as needed
];

// Dummy data for appointments
let appointments = [];

// Middleware
app.use(bodyParser.json());

// Routes

// Doctors listing endpoint
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Doctor detail endpoint
app.get('/api/doctors/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  res.json(doctor);
});

// Availability endpoint
app.get('/api/availability/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  // Simulate availability for the week (Monday to Saturday)
  const availability = {
    doctorId: doctorId,
    doctorName: doctor.name,
    appointments: [],
  };
  for (let i = 1; i <= 6; i++) {
    availability.appointments.push({ date: `2024-04-${i}`, slotsAvailable: doctor.maxPatients });
  }
  res.json(availability);
});

// Appointment booking endpoint
app.post('/api/appointments/book', (req, res) => {
  const { doctorId, patientName, appointmentDate } = req.body;
  // Check if appointment date is valid
  // Check if appointment slot is available
  // Book appointment and add to appointments array
  const newAppointment = { doctorId, patientName, appointmentDate };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
