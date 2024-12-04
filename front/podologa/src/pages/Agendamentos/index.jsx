import React, { useState, useEffect } from "react";
import api from "../../api/axios"; // Importa o axios configurado
import { Calendario } from "../../components/Agendamentos/Calendario";
import { Header } from "../../components/Agendamentos/Header";
import { ListaAgendamentos } from "../../components/Agendamentos/ListaAgendamentos";
import { formatDateToKey } from "../../data/agendamentos";

const Agendamentos = () => {
	const hoje = new Date();
	const [currentDate, setCurrentDate] = useState(hoje);
	const [selectedDate, setSelectedDate] = useState(hoje);
	const [agendamentos, setAgendamentos] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAgendamentos = async () => {
			try {
				// Usando axios para fazer a requisição
				const response = await api.get("/agendamento/listar"); // URL da sua API configurada com o axios
				const data = response.data; // A resposta é armazenada em 'data'

				// Organize os dados de agendamentos por data
				const agendamentosFormatados = {};

				// Usando for...of para iterar sobre os dados
				for (const agendamento of data) {
					const dateKey = formatDateToKey(
						new Date(agendamento.dataAgendamento),
					);

					// Organize os agendamentos pela chave da data
					if (!agendamentosFormatados[dateKey]) {
						agendamentosFormatados[dateKey] = {
							totalVagas: 1, // ou outro valor que represente o total de vagas
							agendamentos: [],
						};
					}

					agendamentosFormatados[dateKey].agendamentos.push({
						...agendamento,
						paciente: agendamento.paciente,
						problemas: JSON.parse(agendamento.problemasSelecionados), // Converter problemas de string para array
					});
				}

				setAgendamentos(agendamentosFormatados);
			} catch (error) {
				console.error("Erro ao carregar agendamentos:", error);
			} finally {
				setLoading(false);
			}
		};

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
			0,
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
			new Date(currentDate.getFullYear(), currentDate.getMonth() + direcao, 1),
		);
	};

	const selecionarData = (dia, mes) => {
		if (mes === "atual") {
			const novaData = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				dia,
			);
			setSelectedDate(novaData);
		}
	};

	const formatarData = (data) => {
		const dia = String(data.getDate()).padStart(2, "0");
		const mes = String(data.getMonth() + 1).padStart(2, "0");
		const ano = data.getFullYear();
		return `${dia}/${mes}/${ano}`;
	};

	const handleRemoveAgendamento = async (agendamentoId) => {
		if (window.confirm("Tem certeza que deseja remover este agendamento?")) {
			try {
				// Remover o agendamento via API
				await api.delete(`/agendamentos/${agendamentoId}`);
				// Atualizar o estado após a remoção
				const dateKey = formatDateToKey(selectedDate);

				setAgendamentos((prevAgendamentos) => {
					const newAgendamentos = { ...prevAgendamentos };

					if (newAgendamentos[dateKey]) {
						newAgendamentos[dateKey] = {
							...newAgendamentos[dateKey],
							agendamentos: newAgendamentos[dateKey].agendamentos.filter(
								(agendamento) => agendamento.id !== agendamentoId,
							),
						};

						// Remove a data se não houver mais agendamentos
						if (newAgendamentos[dateKey].agendamentos.length === 0) {
							delete newAgendamentos[dateKey];
						}
					}

					return newAgendamentos;
				});
			} catch (error) {
				console.error("Erro ao remover agendamento:", error);
			}
		}
	};

	const diasCalendario = getDiasDoMes(currentDate);
	const dateKey = formatDateToKey(selectedDate);
	const dadosDoDia = agendamentos[dateKey] || {
		totalVagas: 0,
		agendamentos: [],
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
						formatarData={formatarData}
						onRemoveAgendamento={handleRemoveAgendamento}
					/>
				</div>
			)}
		</div>
	);
};

export default Agendamentos;
