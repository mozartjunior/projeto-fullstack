import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { LoginDTO } from "../../dtos/AuthDTO.js";

export class LoginService {

  constructor(
    private usuarioRepository: any,
    private sessaoRepository: any,
  ) {}

  async execute(data: LoginDTO, ip?: string, userAgent?: string) {
    
    // Busca usuário pelo email — inclui senha_hash
    const usuario = await this.usuarioRepository.findByEmail(data.email);
    if (!usuario) {
      throw new Error("Email ou senha inválidos.");
    }

    // Verifica se o usuário está ativo
    if (!usuario.ativo) {
      throw new Error("Usuário desativado. Contate o administrador.");
    }

    // Compara a senha enviada com o hash salvo no banco
    const senhaCorreta = await bcrypt.compare(data.password, usuario.senha_hash);
    if (!senhaCorreta) {
      throw new Error("Email ou senha inválidos.");
    }

    // Payload do JWT — dados que ficam dentro do token
    const payload = {
      id_usuario: usuario.id_usuario,
      perfil: usuario.perfil,
      setor_id: usuario.setor?.id_setor,
    };

    // accessToken — curta duração (15 minutos)
    // Usado para autenticar cada requisição
    console.log('JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET);
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "15m" }
    );

    // refreshToken — longa duração (7 dias)
    // Usado para gerar um novo accessToken sem precisar logar de novo
    const refreshToken = jwt.sign(
      { id_usuario: usuario.id_usuario },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    // Salva o hash do refreshToken no banco
    // Nunca salvamos o token puro — mesma lógica da senha
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 dias

    await this.sessaoRepository.create({
      usuario: { id_usuario: usuario.id_usuario },
      refresh_token_hash: refreshTokenHash,
      expires_at: expiresAt,
      ip: ip || null,
      user_agent: userAgent || null,
    });

    return {
      accessToken,
      refreshToken,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    };
  }
}