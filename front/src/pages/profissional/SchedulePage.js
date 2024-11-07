import React, { useEffect, useState } from 'react';
import { getProfessionalSchedule } from '../../services/professionalService';
import Header from '../../components/Header';

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await getProfessionalSchedule();
      setSchedule(response.data);
    };

    fetchSchedule();
  }, []);

  return (
    <div>
      <Header title="Minha Agenda" />
      <ul>
        {schedule.map((entry) => (
          <li key={entry.id}>{entry.date} - {entry.patientName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulePage;
