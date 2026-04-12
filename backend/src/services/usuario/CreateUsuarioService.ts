import bcrypt from "bcryptjs";
import type { CreateUserSchemaDTO } from "../../dtos/createUserSchemaDTO.js";

export class CreateUsuarioService {

  constructor(
    private usuarioRepository: any,
    private setorRepository: any,
  ) {}

  async execute(data: CreateUserSchemaDTO) {

    // Verifica se o email já está cadastrado
    const emailExists = await this.usuarioRepository.findByEmail(data.email);
    if (emailExists) {
      throw new Error("Já existe um usuário com esse email.");
    }

    // Verifica se o setor informado existe
    const setor = await this.setorRepository.findById(data.setor_id);
    if (!setor) {
      throw new Error(`Setor #${data.setor_id} não encontrado.`);
    }

    // Gera o hash da senha — NUNCA salvar senha pura no banco
    // 10 = número de rounds do bcrypt (padrão seguro)
    const senha_hash = await bcrypt.hash(data.password, 10);

    return this.usuarioRepository.create({
      nome: data.nome,
      email: data.email,
      senha_hash,
      perfil: data.perfil,
      setor: { id_setor: data.setor_id },
    });
  }
}