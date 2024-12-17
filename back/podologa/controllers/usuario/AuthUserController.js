const { AuthUserService } = require("../../services/usuario/AuthUserService");

class AuthUserController {
  async handle(request, response) {
    const { email, senha } = request.body;

    const authUserService = new AuthUserService();

    try {
      const sessao = await authUserService.execute({
        email,
        senha
      });
      return response.json(sessao);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports =  AuthUserController ;
