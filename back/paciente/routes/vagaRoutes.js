const express = require('express');
const router = express.Router();
const vagaController = require('../controllers/vagaController');

// Rota para listar dias com vagas disponíveis
router.get('/dias-disponiveis', vagaController.listarDiasDisponiveis);

// Rota para criar uma nova vaga
router.post('/criar-vaga', vagaController.criarVaga);
router.get('/listar-vagas-por-dia/:data', vagaController.listarVagasPorDia);


module.exports = router;
