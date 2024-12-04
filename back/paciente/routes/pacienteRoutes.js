// paciente/paciente.routes.js

const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Rota para criar um novo paciente
router.post('/', pacienteController.createPaciente);

// Rota para listar todos os pacientes
router.get('/', pacienteController.getAllPacientes);

// Rota para obter um paciente específico por ID
router.get('/:id', pacienteController.getPacienteById);

// Rota para atualizar um paciente por ID
router.put('/:id', pacienteController.updatePaciente);

// Rota para excluir um paciente por ID
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;
