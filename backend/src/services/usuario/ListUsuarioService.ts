export class ListUsuarioService {

  constructor(private usuarioRepository: any) {}

  async execute() {
    return this.usuarioRepository.findAll();
  }
}