import React, { useState } from 'react';
import '../../styles/FichadoPaciente.css'; 

function HealthAssessment() {
  const [answers, setAnswers] = useState({
    diabetes: null,
    hipertensao: null,
    cardiopatia: null,
    marcapasso: null,
    gestante: null,
  });

  const handleAnswerChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const questions = [
    { key: 'diabetes', label: 'Diabetes' },
    { key: 'hipertensao', label: 'Hipertensão' },
    { key: 'cardiopatia', label: 'Cardiopatia' },
    { key: 'marcapasso', label: 'Marcapasso' },
    { key: 'gestante', label: 'Gestante' },
  ];

  return (
    <div>
      {questions.map((question) => (
        <div key={question.key} className="question">
          <span>{question.label}</span>
          <label>
            <input
              type="radio"
              name={question.key}
              value="sim"
              checked={answers[question.key] === 'sim'}
              onChange={() => handleAnswerChange(question.key, 'sim')}
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name={question.key}
              value="nao"
              checked={answers[question.key] === 'nao'}
              onChange={() => handleAnswerChange(question.key, 'nao')}
            />
            Não
          </label>
          <label>
            <input
              type="radio"
              name={question.key}
              value="nao-sei"
              checked={answers[question.key] === 'nao-sei'}
              onChange={() => handleAnswerChange(question.key, 'nao-sei')}
            />
            Não sei
          </label>
        </div>
      ))}
    </div>
  );
}

export default HealthAssessment;
