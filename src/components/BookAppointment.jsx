import React, { useState, useEffect } from 'react';

const BookAppointment = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch patients
    fetch('http://localhost:3000/patients')
      .then(response => response.json())
      .then(data => setPatients(data));

    // Fetch doctors
    fetch('http://localhost:3000/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Get patient name
    const patient = patients.find(patient => patient.id === selectedPatient);
    const patientName = patient ? patient.name : '';

    // Get doctor name
    const doctor = doctors.find(doctor => doctor.id === selectedDoctor);
    const doctorName = doctor ? doctor.name : '';

    // Make a POST request to the appointments endpoint
    fetch('http://localhost:3000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patient: patientName,
        doctor: doctorName,
        appointmentTime: appointmentTime
      })
    })
    .then(response => {
      if (response.ok) {
        setMessage('Appointment booked successfully!');
      } else {
        setMessage('Failed to book appointment');
      }
    })
    .catch(error => setMessage('Failed to book appointment'));
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patient">Select Patient:</label>
          <select id="patient" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="doctor">Select Doctor:</label>
          <select id="doctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="appointmentTime">Select Appointment Time:</label>
          <input type="datetime-local" id="appointmentTime" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;
