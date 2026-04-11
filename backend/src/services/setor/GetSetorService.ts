export class GetSetorService {

  constructor(private setorRepository: any) {}

  async execute(id_setor: string) {

    if (!id_setor) {
      throw new Error("O campo id_setor é obrigatório.");
    }

    const setor = await this.setorRepository.findById(id_setor);
    if (!setor) {
      throw new Error(`Setor #${id_setor} não encontrado.`);
    }

    return setor;
  }
}