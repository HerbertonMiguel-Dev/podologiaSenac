const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

class CreateUsuarioService {
  async execute({ nome, email, senha }) {
    if (!email) {
      throw new Error("Email is required");
    }

    // Verifica se o usuário já existe
    const usuarioJaExiste = await prisma.usuario.findFirst({ // Substituído prismaClient por prisma
      where: {
        email: email,
      },
    });

    if (usuarioJaExiste) {
      throw new Error("Email already exists");
    }

    // Cria hash da senha
    const hashDeSenha = await bcrypt.hash(senha, 8);

    // Cria o usuário no banco
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: nome,
        email: email,
        senha: hashDeSenha,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    return novoUsuario;
  }
}

module.exports = CreateUsuarioService;
