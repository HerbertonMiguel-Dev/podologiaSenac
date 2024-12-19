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
  fetchData,
}) => {
  const [vagas, setVagas] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const vagasDisponiveis = vagas ? vagas.totalVagas - agendamentos.length : 0;

  const handleDetalhes = (paciente) => {
    setPacienteSelecionado(paciente);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get(
          `/vagas/listar-vagas-por-dia/${selectedDate.toISOString().split("T")[0]}`
        );
        setVagas(response.data);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
        setVagas(null);
      }
    };

    if (selectedDate) {
      fetchVagas();
    }
  }, [selectedDate]);

  const handleDeleteAgendamento = async (agendamentoId) => {
    try {
      await api.delete(`/agendamento/${agendamentoId}`);
      const novaLista = agendamentos.filter(
        (agendamento) => agendamento.id !== agendamentoId
      );
      window.location.reload();
      fetchData(novaLista);
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      alert("Agendamento excluido com sucesso");
    }
  };

  const handleConcluirAgendamento = async (agendamentoId) => {
    try {
      await api.put(`/agendamento/${agendamentoId}/concluir`);
      const atualizado = agendamentos.map((agendamento) =>
        agendamento.id === agendamentoId
          ? { ...agendamento, status: "FINALIZADO" }
          : agendamento
      );

      const pendentes = atualizado.filter(
        (agendamento) => agendamento.status !== "FINALIZADO"
      );
      const finalizados = atualizado.filter(
        (agendamento) => agendamento.status === "FINALIZADO"
      );

      // Mover o agendamento concluído para o final da lista
      const agendamentoConcluido = atualizado.find(
        (agendamento) => agendamento.id === agendamentoId
      );

      if (agendamentoConcluido) {
        finalizados.unshift(agendamentoConcluido);
      }

      if (onConcluirAgendamento) {
        onConcluirAgendamento(agendamentoId);
      }

      window.location.reload();
      fetchData([...pendentes, ...finalizados]);
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
        <LiberarVagas selectedDate={selectedDate} fetchData={fetchData} />
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className="border rounded-lg p-4 hover:border-purple-200 transition-colors relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 flex-grow">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{agendamento.paciente.nome}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-sm px-2 py-1 rounded ${agendamento.status === "CONFIRMADO"
                        ? "bg-green-100 text-green-700"
                        : agendamento.status === "pendente"
                          ? "bg-yellow-100 text-yellow-700"
                          : agendamento.status === "Finalizado"
                            ? "bg-red-300 text-yellow-700"
                            : ""
                      }`}
                  >
                    {agendamento.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{agendamento.paciente.email || "Sem e-mail"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Idade: {agendamento.paciente.idade || "N/A"} anos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    Telefone: {agendamento.paciente.telefone || "Sem telefone"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>CPF: {agendamento.paciente.cpf || "Sem telefone"}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => handleDetalhes(agendamento.paciente)}
                  >
                    Detalhes
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                    onClick={() => handleConcluirAgendamento(agendamento.id)}
                  >
                    Concluir atendimento
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    onClick={() => handleDeleteAgendamento(agendamento.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhum agendamento para esta data
          </div>
        )}
      </div>


      {showModal && pacienteSelecionado && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Detalhes do Paciente</h2>
          <p>Nome: {pacienteSelecionado.nome}</p>
          <p>Idade: {pacienteSelecionado.idade} anos</p>
          <p>Email: {pacienteSelecionado.email}</p>
          <p>Telefone: {pacienteSelecionado.telefone}</p>
          <p>Diabetes: {pacienteSelecionado.diabetes ? 'Sim' : 'Não'}</p>
          <p>Hipertensão: {pacienteSelecionado.hipertensao ? 'Sim' : 'Não'}</p>
          <p>Cardiopatia: {pacienteSelecionado.cardiopatia ? 'Sim' : 'Não'}</p>
          <p>Marcapasso: {pacienteSelecionado.marcapasso ? 'Sim' : 'Não'}</p>
          <p>Gestante: {pacienteSelecionado.gestante ? 'Sim' : 'Não'}</p>
        </Modal>
      )}
    </div>
  );
};