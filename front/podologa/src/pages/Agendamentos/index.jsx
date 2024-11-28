import React, { useState } from "react";
import { Calendario } from "../../components/Agendamentos/Calendario";
import { Header } from "../../components/Agendamentos/Header";
import { ListaAgendamentos } from "../../components/Agendamentos/ListaAgendamentos";
import { formatDateToKey, mockupAgendamentos } from "../../data/agendamentos";

const Agendamentos = () => {
	// Define currentDate e selectedDate como a data atual
	const hoje = new Date();
	const [currentDate, setCurrentDate] = useState(hoje);
	const [selectedDate, setSelectedDate] = useState(hoje);
	const [agendamentos, setAgendamentos] = useState(mockupAgendamentos);

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

	const handleRemoveAgendamento = (agendamentoId) => {
		if (window.confirm("Tem certeza que deseja remover este agendamento?")) {
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
		</div>
	);
};

export default Agendamentos;
