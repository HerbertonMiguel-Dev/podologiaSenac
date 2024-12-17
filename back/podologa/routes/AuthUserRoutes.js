const express = require("express");
const router = express.Router();
const AuthUserController = require("../controllers/usuario/AuthUserController");

const authUserController = new AuthUserController();

// Rota de autenticação
router.post("/login", (request, response) => {
    return authUserController.handle(request, response);
});

module.exports = router;
