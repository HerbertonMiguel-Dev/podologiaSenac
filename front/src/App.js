import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PatientDashboard from './pages/patient/PatientDashboard';
import AppointmentPage from './pages/patient/AppointmentPage';
import ProfessionalDashboard from './pages/professional/ProfessionalDashboard';
import SchedulePage from './pages/professional/SchedulePage';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas para Pacientes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<AppointmentPage />} />

        {/* Rotas para Profissionais */}
        <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
        <Route path="/professional/schedule" element={<SchedulePage />} />

        {/* Rota padrão */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
