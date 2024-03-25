import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard, SignInForm } from "../Pages";
import { DoctorForm, PatientForm, BookAppointment, AppointmentsList } from "../components";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Nested routes for components under Dashboard */}
        <Route path="" element={<AppointmentsList />} />
        <Route path="DoctorForm" element={<DoctorForm />} />
        <Route path="PatientForm" element={<PatientForm />} />
        <Route path="BookAppointment" element={<BookAppointment />} />
      </Route>
    </Routes>
  );
}
