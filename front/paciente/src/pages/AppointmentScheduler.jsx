import dayjs from "dayjs";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import api from "../api/axios";
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
    idade: "",
    email: "",
    phone: "",
    cpf: "",
    date: null,
    selectedDay: null,
    problem: [],
    healthConditions: {},
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false); // Novo estado para controlar a validação do passo atual

  const handleConfirm = async () => {
    console.log("Estado do formData antes da requisição:", formData);

    const dataFormatada = dayjs(formData.date).format("YYYY-MM-DD");
    console.log(dataFormatada);

    try {
      const response = await api.post("/agendamento/criar", {
        cpf: formData.cpf,
        nome: formData.name,
        idade: formData.idade,
        email: formData.email,
        telefone: formData.phone,
        dataAgendamento: dataFormatada,
        problemasSelecionados: formData.problem,
        condicoesDeSaude: formData.healthConditions,
      });

      console.log("Resposta do servidor:", response);

      if (response.status === 200 || response.status === 201) {
        console.log("Agendamento criado com sucesso", response.data);
      } else {
        console.error("Erro ao criar agendamento", response.data);
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "O nome é obrigatório.";
    if (!formData.idade.trim()) errors.idade = "A idade é obrigatória.";
    if (!formData.phone.trim()) errors.phone = "O telefone é obrigatório.";
    if (!formData.cpf.trim()) errors.cpf = "O CPF é obrigatório.";
    if (!formData.date) errors.date = "A data é obrigatória.";

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
      setIsStepValid(false); // Reseta o estado para o próximo passo
    } else if (currentStep === 2) {
      if (validateFields()) {
        setCurrentStep(currentStep + 1);
        setIsStepValid(false); // Reseta o estado para o próximo passo
      }
    } else if (currentStep === 3) {
      await handleConfirm();
      setShowSuccessModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setIsStepValid(true); // Permite navegação de volta sem bloquear o botão
    }
  };

  const handleDateSelection = (day, month, year) => {
    const newDate = new Date(year, month, day);

    console.log("Nova data selecionada:", dayjs(newDate).format("DD/MM/YYYY"));

    setFormData({
      ...formData,
      date: newDate,
      selectedDay: day,
    });
    setErrorMessages((prev) => ({ ...prev, date: null })); // Remove o erro de data
    setIsStepValid(true); // Libera o botão para o próximo passo
  };

  const handleFieldUpdate = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrorMessages((prev) => ({ ...prev, [field]: null })); // Remove erro ao atualizar o campo

    if (currentStep === 2) {
      const areFieldsValid =
        formData.name.trim() &&
        formData.idade.trim() &&
        formData.phone.trim() &&
        formData.cpf.trim();

      setIsStepValid(areFieldsValid); // Atualiza a validade do botão
    }
  };

  // Função para verificar se os campos obrigatórios estão preenchidos
  const areRequiredFieldsFilled = () => {
    if (currentStep === 1) {
      return !!formData.date; // Apenas a data é necessária no passo 1
    }
    if (currentStep === 2) {
      return (
        formData.name.trim() &&
        formData.idade.trim() &&
        formData.phone.trim() &&
        formData.cpf.trim()
      ); // Todos os campos são necessários no passo 2
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div
        className={`max-w-7xl mx-auto px-4 ${showSuccessModal ? "opacity-20" : ""} transition-opacity duration-200`}
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
              selectedDate={formData.selectedDay}
              onSelectDate={handleDateSelection}
            />
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <PersonalInfoForm
                  formData={formData}
                  onUpdateForm={handleFieldUpdate} // Atualiza o formulário com a função modificada
                  errorMessages={errorMessages}
                />
                <ProblemSelection
                  selectedProblems={formData.problem}
                  onSelectProblems={(updatedProblems) =>
                    setFormData({ ...formData, problem: updatedProblems })
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

          {currentStep === 3 && (
            <ConfirmationStep formData={formData} onConfirm={handleNext} />
          )}
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

          {currentStep < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className={`px-6 py-2 rounded-md ml-auto ${isStepValid
                  ? "bg-orange-500 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              disabled={!isStepValid} // Botão desabilitado se o passo atual não for válido
            >
              Próximo
            </button>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false); // Fecha o modal
          setTimeout(() => {
            setCurrentStep(1); // Redireciona para o passo 1 após 3 segundos
          }, 3000); // 3000 milissegundos = 3 segundos
        }}
        name={formData.name}
      />
    </div>
  );
};

export default AppointmentScheduler;