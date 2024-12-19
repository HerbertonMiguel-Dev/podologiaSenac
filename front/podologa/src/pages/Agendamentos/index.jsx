import React, { useState, useEffect } from "react";
import api from "../../api/axios"; // Importa o axios configurado
import { Calendario } from "../../components/Agendamentos/Calendario";
import { Header } from "../../components/Agendamentos/Header";
import { ListaAgendamentos } from "../../components/Agendamentos/ListaAgendamentos";
import { formatDateToKey } from "../../data/agendamentos";
import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Importando o jsPDF

import { canSSRAuth } from '../../utils/canSSRAuth'

const Agendamentos = () => {
  const hoje = new Date();
  const [currentDate, setCurrentDate] = useState(hoje);
  const [selectedDate, setSelectedDate] = useState(hoje);
  const [agendamentos, setAgendamentos] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const { "@podologia.token": token } = parseCookies();

    if (!token) {
      // Redireciona para login se o token não existir
      navigate("/");
    }
  }, [navigate]);

  // Função para formatar a data
  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para buscar os agendamentos
  const fetchAgendamentos = async () => {
    try {
      const response = await api.get("/agendamento/listar");
      const data = response.data;

      // Organizar agendamentos por data
      const agendamentosFormatados = {};
      data.forEach((agendamento) => {
        const dateKey = formatDateToKey(new Date(agendamento.dataAgendamento));

        if (!agendamentosFormatados[dateKey]) {
          agendamentosFormatados[dateKey] = {
            totalVagas: agendamento.totalVagas || 0,
            disponivel: agendamento.disponivel || 0,
            agendamentos: [],
          };
        }

        agendamentosFormatados[dateKey].agendamentos.push({
          ...agendamento,
          paciente: agendamento.paciente,
        });
      });

      setAgendamentos(agendamentosFormatados);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const getDiasDoMes = (data) => {
    const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
    const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    const diasAnteriores = [];
    const primeiroDiaSemana = primeiroDia.getDay();
    const ultimoDiaMesAnterior = new Date(
      data.getFullYear(),
      data.getMonth(),
      0
    ).getDate();

    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
      diasAnteriores.push({
        dia: ultimoDiaMesAnterior - i,
        mes: "anterior",
      });
    }

    const diasAtuais = [];
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const dataAtual = new Date(data.getFullYear(), data.getMonth(), i);
      const key = formatDateToKey(dataAtual);
      diasAtuais.push({
        dia: i,
        mes: "atual",
        temAgendamento: !!agendamentos[key],
      });
    }

    const diasPosteriores = [];
    const totalDias = diasAnteriores.length + diasAtuais.length;
    const diasRestantes = 42 - totalDias;

    for (let i = 1; i <= diasRestantes; i++) {
      diasPosteriores.push({
        dia: i,
        mes: "proximo",
      });
    }

    return [...diasAnteriores, ...diasAtuais, ...diasPosteriores];
  };

  const mudarMes = (direcao) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direcao, 1)
    );
  };

  const selecionarData = (dia, mes) => {
    if (mes === "atual") {
      const novaData = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        dia
      );
      setSelectedDate(novaData);
    }
  };

  const diasCalendario = getDiasDoMes(currentDate);
  const dateKey = formatDateToKey(selectedDate);
  const dadosDoDia = agendamentos[dateKey] || {
    totalVagas: 0,
    disponivel: 0,
    agendamentos: [],
  };

  // Função para gerar o PDF
  const gerarPdf = () => {
    const doc = new jsPDF();
    const data = dadosDoDia.agendamentos;

    doc.text("Lista de Agendamentos", 20, 20);

    // Adiciona cada agendamento ao PDF
    let yPosition = 30;
    data.forEach((agendamento) => {
      const pacienteNome = agendamento.paciente.nome; // Ajuste para acessar a propriedade correta
      const email = agendamento.paciente.email || "email não definido"; // Ajuste para lidar com valores indefinidos
      const idade = agendamento.paciente.idade || "idade não definido";
      const telefone = agendamento.paciente.telefone || "telefone não definido";
      const cpf = agendamento.paciente.cpf || "cpf não definido";
      const problemas = agendamento.problemasSelecionados || "Problema não definido";
      const status = agendamento.status || "Status não definido"; // Ajuste para lidar com valores indefinidos

      doc.text(`Paciente: ${pacienteNome}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Email: ${email}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Idade: ${idade}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Telefone: ${telefone}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Cpf: ${cpf}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Problemas: ${problemas}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Status: ${status}`, 10, yPosition);
      yPosition += 20; // Adiciona um espaço extra entre os agendamentos
    });

    doc.save("agendamentos.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">
      <Header />
      {loading ? (
        <div>Carregando agendamentos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
          <div className="space-y-6">
            <Calendario
              currentDate={currentDate}
              selectedDate={selectedDate}
              diasDaSemana={diasDaSemana}
              meses={meses}
              diasCalendario={diasCalendario}
              mudarMes={mudarMes}
              selecionarData={selecionarData}
            />
          </div>
          <ListaAgendamentos
            selectedDate={selectedDate}
            agendamentos={dadosDoDia.agendamentos}
            totalVagas={dadosDoDia.totalVagas}
            disponivel={dadosDoDia.disponivel}
            formatarData={formatarData}
            fetchAgendamentos={fetchAgendamentos} // Passa a função para atualizar os dados
          />
        </div>
      )}
      <button onClick={gerarPdf} className="mt-1 p-1 rounded bg-blue-500 text-white">
        Gerar PDF
      </button>
    </div>
  );
};

export default Agendamentos;