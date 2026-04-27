import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { RefreshDTO } from "../../dtos/authDTO.js";

export class RefreshTokenService {

  constructor(private sessaoRepository: any) {}

  async execute(data: RefreshDTO) {

    // Verifica assinatura e expiração do JWT
    let payload: any;
    try {
      payload = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET as string);
    } catch {
      throw new Error("Refresh token inválido ou expirado.");
    }

    // Busca todas as sessões ativas do usuário e compara o hash
    const sessoes = await this.sessaoRepository.findAtivasByUsuarioId(payload.id_usuario);
    
    let sessaoValida = null;
    for (const sessao of sessoes) {
      const match = await bcrypt.compare(data.refreshToken, sessao.refresh_token_hash);
      if (match) {
        sessaoValida = sessao;
        break;
      }
    }

    if (!sessaoValida) {
      throw new Error("Sessão não encontrada ou já revogada.");
    }

    // Verifica se a sessão expirou no banco
    if (new Date() > new Date(sessaoValida.expires_at)) {
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    const usuario = sessaoValida.usuario;

    // Gera novo accessToken com os dados atualizados do usuário
    const novoAccessToken = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        perfil: usuario.perfil,
        setor_id: usuario.setor?.id_setor,
      },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "15m" }
    );

    return { accessToken: novoAccessToken };
  }
}
