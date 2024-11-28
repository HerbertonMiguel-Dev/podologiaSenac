import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import ConfirmationStep from "../components/ConfirmationStep";
import HealthAssessment from "../components/HealthAssessment";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ProblemSelection from "../components/ProblemSelection";
import SenacLogo from "../components/SenacLogo";
import StepIndicator from "../components/StepIndicator";
import SuccessModal from "../components/SuccessModal";

const AppointmentScheduler = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    date: null, // Mantemos null como valor inicial
    selectedDay: null, // Novo campo para armazenar apenas o dia selecionado
    problem: "",
    healthConditions: {},
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDateSelection = (day) => {
    // Cria uma nova data com o dia selecionado
    const newDate = new Date();
    newDate.setDate(day);
    
    setFormData({
      ...formData,
      date: newDate,
      selectedDay: day // Armazena o dia selecionado separadamente
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div
        className={`max-w-7xl mx-auto px-4 ${
          showSuccessModal ? "opacity-20" : ""
        } transition-opacity duration-200`}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <SenacLogo />
          </div>
          <h1 className="text-xl text-blue-900">
            Agendamento de consulta |{" "}
            <span className="font-medium">Podologia</span>
          </h1>
        </div>

        <StepIndicator currentStep={currentStep} />

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          {currentStep === 1 && (
            <AppointmentCalendar
              selectedDate={formData.selectedDay} // Passa apenas o dia selecionado
              onSelectDate={handleDateSelection} // Usa a nova função de manipulação
            />
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <PersonalInfoForm
                  formData={formData}
                  onUpdateForm={(field, value) =>
                    setFormData({ ...formData, [field]: value })
                  }
                />
                <ProblemSelection
                  selectedProblem={formData.problem}
                  onSelectProblem={(problem) =>
                    setFormData({ ...formData, problem })
                  }
                />
              </div>
              <div>
                <HealthAssessment
                  health={formData.healthConditions}
                  onUpdateHealth={(condition, value) =>
                    setFormData({
                      ...formData,
                      healthConditions: {
                        ...formData.healthConditions,
                        [condition]: value,
                      },
                    })
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 3 && <ConfirmationStep formData={formData} />}
        </div>

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center text-blue-900"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="bg-orange-500 text-white px-6 py-2 rounded-md ml-auto"
          >
            {currentStep === 3 ? "Confirmar" : "Próximo"}
          </button>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        name={formData.name}
      />
    </div>
  );
};

export default AppointmentScheduler;