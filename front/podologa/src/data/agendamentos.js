// mockupAgendamentos.js
export const mockupAgendamentos = {
	// Novembro 2024
	"2024-11-19": {
		totalVagas: 10,
		agendamentos: [
			{
				id: 1,
				nome: "ANA LÍDIA PEREIRA",
				cpf: "111.111.111-11",
				email: "ana.lidia@gmail.com",
				telefone: "(84) 99123-4567",
				status: "PENDENTE",
				health: {
					diabetes: true,
					hipertensao: false,
					cardiopatia: false,
					marcapasso: false,
					gestante: false,
				},
			},
			{
				id: 2,
				nome: "JOSÉ ALVES SOUSA",
				cpf: "222.222.222-22",
				email: "jose.sousa@gmail.com",
				telefone: "(84) 99234-5678",
				status: "CONFIRMADO",
				health: {
					diabetes: false,
					hipertensao: true,
					cardiopatia: false,
					marcapasso: false,
					gestante: false,
				},
			},
		],
	},
	"2024-11-20": {
		totalVagas: 8,
		agendamentos: [
			{
				id: 3,
				nome: "CARLOS EDUARDO LIMA",
				cpf: "333.333.333-33",
				email: "carlos.lima@gmail.com",
				telefone: "(84) 99345-6789",
				status: "CONFIRMADO",
				health: {
					diabetes: false,
					hipertensao: false,
					cardiopatia: false,
					marcapasso: false,
					gestante: true,
				},
			},
		],
	},
	"2024-11-21": {
		totalVagas: 12,
		agendamentos: [
			{
				id: 4,
				nome: "MARINA SILVA COSTA",
				cpf: "444.444.444-44",
				email: "marina.costa@gmail.com",
				telefone: "(84) 99456-7890",
				status: "PENDENTE",
				health: {
					diabetes: false,
					hipertensao: false,
					cardiopatia: true,
					marcapasso: false,
					gestante: false,
				},
			},
		],
	},
	"2024-11-22": {
		totalVagas: 6,
		agendamentos: [
			{
				id: 5,
				nome: "FERNANDO MARTINS ALMEIDA",
				cpf: "555.555.555-55",
				email: "fernando.almeida@gmail.com",
				telefone: "(84) 99567-8901",
				status: "CONFIRMADO",
				health: {
					diabetes: true,
					hipertensao: true,
					cardiopatia: false,
					marcapasso: false,
					gestante: false,
				},
			},
		],
	},
	"2024-11-23": {
		totalVagas: 10,
		agendamentos: [
			{
				id: 6,
				nome: "MARCOS ANTÔNIO DA SILVA",
				cpf: "666.666.666-66",
				email: "marcos.silva@gmail.com",
				telefone: "(84) 99678-9012",
				status: "PENDENTE",
				health: {
					diabetes: false,
					hipertensao: true,
					cardiopatia: false,
					marcapasso: false,
					gestante: false,
				},
			},
		],
	},
	"2024-11-24": {
		totalVagas: 5,
		agendamentos: [],
	},
	"2024-11-25": {
		totalVagas: 8,
		agendamentos: [
			{
				id: 7,
				nome: "GABRIELA MARTINS SOARES",
				cpf: "777.777.777-77",
				email: "gabriela.soares@gmail.com",
				telefone: "(84) 99789-0123",
				status: "CONFIRMADO",
				health: {
					diabetes: false,
					hipertensao: false,
					cardiopatia: true,
					marcapasso: true,
					gestante: false,
				},
			},
		],
	},
};

export const getVagasDisponiveis = (date) => {
	const dateKey = formatDateToKey(date);
	const data = mockupAgendamentos[dateKey];
	return data ? data.totalVagas - data.agendamentos.length : 0;
};

export const adicionarAgendamento = (date, agendamento) => {
	const dateKey = formatDateToKey(date);
	if (!mockupAgendamentos[dateKey]) {
		mockupAgendamentos[dateKey] = { totalVagas: 0, agendamentos: [] };
	}

	const { totalVagas, agendamentos } = mockupAgendamentos[dateKey];
	if (agendamentos.length < totalVagas) {
		mockupAgendamentos[dateKey].agendamentos.push(agendamento);
		return true;
	}
};

export const excluirAgendamento = (date, agendamentoId) => {
	const dateKey = formatDateToKey(date);
	if (mockupAgendamentos[dateKey]) {
		mockupAgendamentos[dateKey].agendamentos = mockupAgendamentos[
			dateKey
		].agendamentos.filter((agendamento) => agendamento.id !== agendamentoId);
	}
};

export const atualizarTotalVagas = (date, totalVagas) => {
	const dateKey = formatDateToKey(date);
	if (!mockupAgendamentos[dateKey]) {
		mockupAgendamentos[dateKey] = { totalVagas, agendamentos: [] };
	} else {
		mockupAgendamentos[dateKey].totalVagas = totalVagas;
	}
};

export const formatDateToKey = (date) => {
	return date.toISOString().split("T")[0];
};

export const getAgendamentosByDate = (date) => {
	const dateKey = formatDateToKey(date);
	return mockupAgendamentos[dateKey] || [];
};

export const hasAgendamentos = (date) => {
	const dateKey = formatDateToKey(date);
	return !!mockupAgendamentos[dateKey];
};
