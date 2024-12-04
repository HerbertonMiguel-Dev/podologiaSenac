// routes/agendamentoRoutes.js
const express = require("express");
const router = express.Router();
const agendamentoController = require("../controllers/agendamentoController");

router.post("/criar", agendamentoController.criarAgendamento);
router.get("/listar", agendamentoController.listarAgendamentos);
router.put(
	"/:agendamentoId/concluir",
	agendamentoController.concluirAgendamento,
);
router.delete("/:agendamentoId", agendamentoController.deletarAgendamento);

module.exports = router;
