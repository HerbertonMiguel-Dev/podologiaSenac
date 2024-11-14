import React from 'react';
import '../../styles/ProfissionalDashboard.css'; // CSS file for styling

function Appointments({ date, appointments }) {
  return (
    <div className="appointments">
      <h2>Agendamentos | {date.toLocaleDateString()}</h2>
      <p>Vagas liberadas: 08</p>
      <p>Vagas preenchidas: 06</p>
      <p>Vagas bloqueadas: 01</p>
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`appointment ${appointment.blocked ? 'blocked' : ''}`}
          >
            {appointment.name}
          </div>
        ))}
      </div>
      <button className="print-button">Imprimir Agendamentos</button>
    </div>
  );
}

export default Appointments;
