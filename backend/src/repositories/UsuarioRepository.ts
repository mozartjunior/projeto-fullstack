import { appDataSource } from "../database/appDataSource.js";
import { Usuario } from "../entities/Usuario.js";

export class UsuarioRepository {
  private repository = appDataSource.getRepository(Usuario);

  async create(data: any) {
    const usuario = this.repository.create(data);
    const saved = await this.repository.save(usuario);
    return this.repository.findOne({ 
      where: { id_usuario: saved.id_usuario },
      select: ["id_usuario", "nome", "email", "perfil"],
      relations: ["setor"],
    });
  }

  async findAll() {
    return this.repository.find({
      select: ["id_usuario", "nome", "email", "perfil"],
      relations: ["setor"],
    });
  }

  async findById(id_usuario: string) {
    return this.repository.findOne({
      where: { id_usuario },
      select: ["id_usuario", "nome", "email", "perfil"],
      relations: ["setor"],
    });
  }

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
      relations: ["setor"],
    });
  }

  async update(id_usuario: string, data: any) {
    await this.repository.update({ id_usuario }, data);
    return this.repository.findOne({
      where: { id_usuario },
      select: ["id_usuario", "nome", "email", "perfil"],
      relations: ["setor"],
    });
  }

  async desativar(id_usuario: string) {
    await this.repository.update({ id_usuario }, { ativo: false });
    return this.repository.findOne({
      where: { id_usuario },
      select: ["id_usuario", "nome", "email", "perfil", "ativo"],
      relations: ["setor"],
    });
  }
}

