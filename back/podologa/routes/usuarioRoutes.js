const express = require("express");
const router = express.Router();
const CreateUsuarioController = require("../controllers/usuario/CreateUsuarioController");

const createUsuarioController = new CreateUsuarioController();

// Rota para criar um usuário
router.post("/usuarios", (request, response) => {
  return createUsuarioController.handle(request, response);
});

module.exports = router;
