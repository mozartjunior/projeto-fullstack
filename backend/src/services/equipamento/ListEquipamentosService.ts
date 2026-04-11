export class ListEquipamentoService {
    
    constructor(private equipamentoRepository: any) {}

    async execute() {
        return await this.equipamentoRepository.findAll();
    }
}