const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const autenticarUsuario = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token de autenticação não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // Espera o formato 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ error: "Token de autenticação não fornecido" });
  }

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ajuste a chave secreta no .env
    req.usuarioId = decoded.id; // Captura o ID do usuário do token

    // (Opcional) Verifique se o usuário ainda existe no banco de dados
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado ou inativo" });
    }

    // Adiciona os dados do usuário à requisição para serem utilizados em outros middlewares ou controladores
    req.usuario = usuario;
    next(); // Passa para o próximo middleware ou controlador
  } catch (error) {
    // Captura erros específicos
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Erro genérico
    return res.status(500).json({ error: "Erro na autenticação", detalhes: error.message });
  }
};

module.exports = autenticarUsuario;
