const CreateUsuarioService = require("../../services/usuario/CreateUsuarioService");

class CreateUsuarioController {
  async handle(request, response) {
    const { nome, email, senha } = request.body;
    const createUsuarioService = new CreateUsuarioService();

    try {
      const usuario = await createUsuarioService.execute({
        nome,
        email,
        senha,
      });

      return response.json(usuario);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = CreateUsuarioController;
