export class GetUsuarioService {

  constructor(private usuarioRepository: any) {}

  async execute(id_usuario: string) {

    if (!id_usuario) {
      throw new Error("O campo id_usuario é obrigatório.");
    }

    const usuario = await this.usuarioRepository.findById(id_usuario);
    if (!usuario) {
      throw new Error(`Usuário #${id_usuario} não encontrado.`);
    }

    return usuario;
  }
}