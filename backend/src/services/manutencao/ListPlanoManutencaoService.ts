export class ListPlanoManutencaoService {

  constructor(private planoRepository: any) {}

  async execute(filtro?: string) {
    switch (filtro) {
      case "atrasados":
        return this.planoRepository.findAtrasados();
      case "proximos7":
        return this.planoRepository.findProximos(7);
      case "proximos30":
        return this.planoRepository.findProximos(30);
      default:
        return this.planoRepository.findAll();
    }
  }
}