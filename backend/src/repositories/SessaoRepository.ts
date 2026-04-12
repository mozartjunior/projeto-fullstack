import { appDataSource } from "../database/appDataSource.js";
import { Sessao } from "../entities/Sessao.js";
import { IsNull } from "typeorm";

export class SessaoRepository {
  private repository = appDataSource.getRepository(Sessao);

  async create(data: any) {
    const sessao = this.repository.create(data);
    return this.repository.save(sessao);
  }

  // Busca todas as sessões ativas (não revogadas) de um usuário
  async findAtivasByUsuarioId(id_usuario: string) {
    return this.repository.find({
      where: {
        usuario: { id_usuario },
        revoked_at: IsNull(),
      },
      relations: ["usuario", "usuario.setor"],
    });
  }

  // Revoga uma sessão específica
  async revogar(id: string) {
    await this.repository.update({ id }, { revoked_at: new Date() });
  }

  // Revoga todas as sessões de um usuário
  async revogarTodas(id_usuario: string) {
    await this.repository
      .createQueryBuilder()
      .update(Sessao)
      .set({ revoked_at: new Date() })
      .where("usuarioId = :id_usuario", { id_usuario })
      .andWhere("revoked_at IS NULL")
      .execute();
  }
}