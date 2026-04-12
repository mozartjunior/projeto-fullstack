// src/services/auth/LogoutService.ts
//
// Fluxo do logout:
//   1. Verifica o refreshToken JWT
//   2. Busca a sessão pelo hash
//   3. Revoga a sessão (salva revoked_at)

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { LogoutDTO } from "../../dtos/AuthDTO.js";

export class LogoutService {

  constructor(private sessaoRepository: any) {}

  async execute(data: LogoutDTO) {

    // Verifica assinatura do JWT
    let payload: any;
    try {
      payload = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET as string);
    } catch {
      throw new Error("Refresh token inválido.");
    }

    // Busca sessões ativas do usuário e encontra a correta pelo hash
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
      throw new Error("Sessão não encontrada ou já encerrada.");
    }

    // Revoga a sessão
    await this.sessaoRepository.revogar(sessaoValida.id);

    return { message: "Logout realizado com sucesso." };
  }
}