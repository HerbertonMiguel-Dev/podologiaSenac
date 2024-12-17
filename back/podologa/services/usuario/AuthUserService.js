const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

class AuthUserService {
  async execute({ email, senha }) {
    // Busca o usuário no banco de dados pelo email
    const usuario = await prisma.usuario.findFirst({
      where: {
        email: email,
      },
    });

    // Verifica se o usuário existe
    if (!usuario) {
      throw new Error("Email ou senha incorretos");
    }

    // Verifica se a senha fornecida corresponde à senha do usuário (comparando com o hash)
    const senhaCorresponde = await compare(senha, usuario.senha);

    if (!senhaCorresponde) {
      throw new Error("Email ou senha incorretos");
    }

    // Gera um token JWT para o usuário
    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email,
      },
      process.env.JWT_SECRET, // Certifique-se de que a variável JWT_SECRET está configurada
      {
        subject: usuario.id, // O ID do usuário é usado como o "subject" do token
        expiresIn: '90d', // O token expira após 90 dias
      }
    );

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token: token,
    };
  }
}

module.exports = { AuthUserService };
