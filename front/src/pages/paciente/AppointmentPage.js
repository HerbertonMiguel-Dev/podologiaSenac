import React, { useEffect, useState } from 'react';
import { getPatientAppointments } from '../../services/patientService';
import Header from '../../components/Header';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getPatientAppointments();
      setAppointments(response.data);
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <Header title="Minhas Consultas" />
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>{appt.date} - {appt.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentPage;
