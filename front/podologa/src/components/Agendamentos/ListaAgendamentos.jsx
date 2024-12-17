import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Heart,
  Mail,
  Phone,
  User,
  Users,
  X,
} from "lucide-react";
import api from "../../api/axios";
import { LiberarVagas } from "./LiberarVagas";

import Modal from "../ModalPaciente/Modal";

export const ListaAgendamentos = ({
  selectedDate,
  agendamentos,
  formatarData,
  onRemoveAgendamento,
  onConcluirAgendamento,
  fetchData, // Função para atualizar os dados
}) => {
  const [vagas, setVagas] = useState(null); // Estado para armazenar as vagas
  const [showModal, setShowModal] = useState(false);
  const vagasDisponiveis = vagas ? vagas.totalVagas - agendamentos.length : 0;

  const handleDetalhes = (paciente) => {
    setShowModal(true); // Abre o modal
  };

  // Buscar as vagas para a data selecionada
  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get(
          `/vagas/listar-vagas-por-dia/${selectedDate.toISOString().split("T")[0]}`
        );
        setVagas(response.data); // Atualiza o estado com as vagas
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
        setVagas(null); // Garante que vagas será null em caso de erro
      }
    };

    if (selectedDate) {
      fetchVagas();
    }
  }, [selectedDate]);

  const handleDeleteAgendamento = async (agendamentoId) => {
    try {
      await api.delete(`/agendamento/${agendamentoId}`);
      if (onRemoveAgendamento) {
        onRemoveAgendamento(agendamentoId);
      }
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
    }
  };

  const handleConcluirAgendamento = async (agendamentoId) => {
    try {
      await api.put(`/agendamento/${agendamentoId}/concluir`);
      if (onConcluirAgendamento) {
        onConcluirAgendamento(agendamentoId);
      }
    } catch (error) {
      console.error("Erro ao concluir agendamento:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Agendamentos para {formatarData(selectedDate)}
        </h2>
        <div className="flex flex-wrap items-center gap-2 my-3">
          {vagas ? (
            <>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm flex items-center gap-1">
                <Users className="w-4 h-4" />
                {vagas.totalVagas} vagas liberadas
              </span>
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded text-sm">
                {agendamentos.length} agendados
              </span>
              <span
                className={`px-3 py-1 rounded text-sm ${vagasDisponiveis > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                  }`}
              >
                {vagasDisponiveis} disponíveis
              </span>
            </>
          ) : (
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm flex items-center gap-1">
              <Users className="w-4 h-4" />
              Nenhuma vaga liberada
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Renderiza LiberarVagas quando não há vagas */}
        {(!vagas || vagas.totalVagas === 0) ? (
          <LiberarVagas
            selectedDate={selectedDate}
            fetchData={fetchData} // Atualiza os dados após criar vagas
          />
        ) : agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className="border rounded-lg p-4 hover:border-purple-200 transition-colors relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 flex-grow">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{agendamento.paciente.nome}</span>
                  {["pendente", "confirmado"].includes(agendamento.status) && (
                    <button
                      type="button"
                      onClick={() => handleDeleteAgendamento(agendamento.id)}
                      className="p-1 rounded-full hover:bg-red-50 transition-colors group"
                      aria-label="Remover agendamento"
                    >
                      <X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-sm px-2 py-1 rounded ${agendamento.status === "CONFIRMADO"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {agendamento.status}
                  </span>
                </div>
              </div>
              {/* Informações adicionais do paciente */}
              {agendamento.paciente.email && (
                <div className="space-y-2 text-sm text-gray-600 mb-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{agendamento.paciente.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Idade: {agendamento.paciente.idade} anos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Telefone: {agendamento.paciente.telefone}</span>
                  </div>
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => handleDetalhes(agendamento.paciente)}
                  >
                    Detalhes
                  </button>
                </div>
              )}

              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <h2>Detalhes do Paciente</h2>
                  <p>Nome: {agendamento.paciente.nome}</p>
                  <p>Idade: {agendamento.paciente.idade} anos</p>
                  <p>Email: {agendamento.paciente.email}</p>
                  <p>Telefone: {agendamento.paciente.telefone}</p>
                  <p>Diabetes: {agendamento.paciente.diabetes ? 'Sim' : 'Não'}</p>
                  <p>Hipertensão: {agendamento.paciente.hipertensao ? 'Sim' : 'Não'}</p>
                  <p>Cardiopatia: {agendamento.paciente.cardiopatia ? 'Sim' : 'Não'}</p>
                  <p>Marcapasso: {agendamento.paciente.marcapasso ? 'Sim' : 'Não'}</p>
                  <p>Gestante: {agendamento.paciente.gestante ? 'Sim' : 'Não'}</p>
                </Modal>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhum agendamento para esta data
          </div>
        )}
      </div>
    </div>
  );
};
