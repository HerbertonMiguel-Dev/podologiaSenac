const prisma = require("../../config/db");

// Criar um novo paciente
// Criar um novo paciente
exports.createPaciente = async (req, res) => {
	try {
		const {
			nome,
			idade,
			cpf,
			email,
			telefone,
			diabetes,
			hipertensao,
			cardiopatia,
			marcapasso,
			gestante,
		} = req.body;
		

		// Criação do paciente com condições de saúde
		const paciente = await prisma.paciente.create({
			data: {
				nome,
				idade,
				cpf,
				email,
				telefone,
				diabetes,
				hipertensao,
				cardiopatia,
				marcapasso,
				gestante,
			},
		});
		res.status(201).json(paciente);
	} catch (error) {
		res
			.status(400)
			.json({ error: "Erro ao criar paciente", details: error.message });
	}
};

// Listar todos os pacientes
exports.getAllPacientes = async (req, res) => {
	try {
		const pacientes = await prisma.paciente.findMany();
		res.json(pacientes);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Erro ao buscar pacientes", details: error.message });
	}
};

// Obter um paciente por ID
exports.getPacienteById = async (req, res) => {
	try {
		const paciente = await prisma.paciente.findUnique({
			where: { id: Number.parseInt(req.params.id, 10) },
		});
		if (!paciente) {
			return res.status(404).json({ error: "Paciente não encontrado" });
		}
		res.json(paciente);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Erro ao buscar paciente", details: error.message });
	}
};

// Atualizar um paciente
exports.updatePaciente = async (req, res) => {
	try {
		const paciente = await prisma.paciente.update({
			where: { id: Number.parseInt(req.params.id, 10) },
			data: req.body,
		});
		res.json(paciente);
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ error: "Paciente não encontrado" });
		}
		res
			.status(400)
			.json({ error: "Erro ao atualizar paciente", details: error.message });
	}
};

// Excluir um paciente
exports.deletePaciente = async (req, res) => {
	try {
		await prisma.paciente.delete({
			where: { id: Number.parseInt(req.params.id, 10) },
		});
		res.json({ message: "Paciente excluído com sucesso" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ error: "Paciente não encontrado" });
		}
		res
			.status(500)
			.json({ error: "Erro ao excluir paciente", details: error.message });
	}
};
