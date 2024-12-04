import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import api from "../api/axios"; // Importe a instância do Axios

const AppointmentCalendar = ({ selectedDate, onSelectDate }) => {
	const today = dayjs();
	const [currentMonth, setCurrentMonth] = useState(today.month());
	const [currentYear, setCurrentYear] = useState(today.year());
	const [availableDays, setAvailableDays] = useState([]); // Estado para armazenar os dias disponíveis
	const [loadedMonths, setLoadedMonths] = useState([]); // Estado para controlar os meses já carregados

	// Função para buscar os dias disponíveis
	const fetchAvailableDays = async () => {
		try {
			const monthYearKey = `${currentYear}-${currentMonth + 1}`; // Ajuste para obter o mês correto (lembre-se que o mês começa em 0)
			if (loadedMonths.includes(monthYearKey)) {
				return; // Se já carregamos o mês/ano, não faz a requisição
			}

			const response = await api.get("/vagas/dias-disponiveis", {
				params: { year: currentYear, month: currentMonth + 1 }, // Passa ano e mês corretos para a API
			});
			const filteredDays = response.data
				.filter(
					(value, index, self) =>
						index === self.findIndex((t) => t.data === value.data),
				)
				.map((item) => item.data); // Apenas o valor da data
			setAvailableDays(filteredDays); // Atualiza o estado com os dias disponíveis
			setLoadedMonths((prev) => [...prev, monthYearKey]); // Marca o mês/ano como carregado
		} catch (error) {
			console.error("Erro ao buscar dias disponíveis:", error);
		}
	};

	useEffect(() => {
		fetchAvailableDays(); // Chama a função ao carregar o componente ou quando o mês/ano mudar
	}, [currentMonth, currentYear]); // Refaz a requisição apenas se o mês/ano mudar

	// Função para gerar os dias do calendário
	const generateCalendarDays = () => {
		const days = [];
		const totalDays = dayjs(
			new Date(currentYear, currentMonth + 1, 0),
		).daysInMonth(); // Total de dias do mês
		const firstDay = dayjs(new Date(currentYear, currentMonth, 1)).day(); // Primeiro dia do mês

		// Dias vazios no início do calendário
		for (let i = 0; i < firstDay; i++) {
			days.push(<div key={`empty-${i}`} className="h-10" aria-hidden="true" />);
		}

		// Gerar os dias do mês
		for (let day = 1; day <= totalDays; day++) {
			// Cria a data completa para o dia atual
			const currentDate = dayjs()
				.year(currentYear)
				.month(currentMonth)
				.date(day)
				.format("YYYY-MM-DD");

			// Verifica se a data completa (ano, mês e dia) está disponível no array availableDays
			const isSelectable = availableDays.includes(currentDate);

			const isSelected = day === selectedDate;
			const isToday =
				day === today.date() &&
				currentMonth === today.month() &&
				currentYear === today.year();

			days.push(
				<button
					type="button"
					key={day}
					disabled={!isSelectable} // Desabilita o botão se não houver vagas
					onClick={() => {
						if (isSelectable) {
							onSelectDate(day, currentMonth, currentYear);
						}
					}}
					aria-label={`${day} de ${getMonthName()} ${isSelectable ? "disponível" : "indisponível"}`}
					aria-selected={isSelected}
					className={`relative h-10 w-10 rounded-lg flex items-center justify-center text-sm
            transition-all duration-200 ease-in-out
            ${isSelectable ? "hover:bg-orange-100 hover:scale-105 cursor-pointer text-blue-900" : "text-gray-300 cursor-not-allowed"}
            ${isSelected ? "bg-orange-500 text-white hover:bg-orange-600 scale-105 shadow-lg ring-2 ring-orange-300 ring-offset-2" : ""}
            ${!isSelected && isToday ? "border-2 border-orange-500 font-semibold" : ""}
            ${!isSelected && !isToday && isSelectable ? "border border-gray-200" : ""}`}
				>
					{day}
					{isSelected && (
						<span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
					)}
				</button>,
			);
		}

		return days;
	};

	// Função para pegar o nome do mês
	const getMonthName = () => {
		const months = [
			"janeiro",
			"fevereiro",
			"março",
			"abril",
			"maio",
			"junho",
			"julho",
			"agosto",
			"setembro",
			"outubro",
			"novembro",
			"dezembro",
		];
		return months[currentMonth];
	};

	// Função para navegar entre os meses
	const changeMonth = (direction) => {
		const newDate = dayjs().month(currentMonth).year(currentYear);
		if (direction === "prev") {
			const newMonth = newDate.subtract(1, "month");
			setCurrentMonth(newMonth.month());
			setCurrentYear(newMonth.year());
		} else if (direction === "next") {
			const newMonth = newDate.add(1, "month");
			setCurrentMonth(newMonth.month());
			setCurrentYear(newMonth.year());
		}
	};

	// Função para formatar a data selecionada
	const formatDate = () => {
		if (!selectedDate) return "Nenhuma data escolhida";

		const selectedDateObj = dayjs(
			new Date(currentYear, currentMonth, selectedDate),
		);

		return `${getWeekDayName(selectedDateObj)}, ${selectedDateObj.date()} de ${getMonthName()} de ${selectedDateObj.year()}`;
	};

	// Função para pegar o nome do dia da semana
	const getWeekDayName = (date) => {
		const weekDays = [
			"Domingo",
			"Segunda-feira",
			"Terça-feira",
			"Quarta-feira",
			"Quinta-feira",
			"Sexta-feira",
			"Sábado",
		];
		return weekDays[date.day()];
	};

	// Dias da semana para exibição no calendário
	const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

	return (
		<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-medium text-blue-900">
					{`${getMonthName().charAt(0).toUpperCase()}${getMonthName().slice(1)} ${currentYear}`}
				</h2>
				<div className="flex gap-2">
					<button
						className="p-2 rounded-full text-gray-400 hover:text-blue-900 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
						type="button"
						onClick={() => changeMonth("prev")}
						aria-label="Mês anterior"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<button
						className="p-2 rounded-full text-gray-400 hover:text-blue-900 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
						type="button"
						onClick={() => changeMonth("next")}
						aria-label="Próximo mês"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-1 mb-2">
				{weekDays.map((day) => (
					<div
						key={day}
						className="h-10 flex items-center justify-center text-sm font-medium text-gray-600"
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>

			<div className="mt-6 text-center">
				<div
					className={`text-xl font-normal text-blue-950 ${selectedDate ? "bg-orange-100 p-4 rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg" : ""}`}
				>
					{formatDate()}
				</div>
			</div>
		</div>
	);
};

export default AppointmentCalendar;
