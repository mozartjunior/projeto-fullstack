export class ListEquipamentoService {
    
    constructor(private equipamentoRepository: any) {}

    async execute() {
        const equipamentos = await this.equipamentoRepository.findAll({
            relations: ["setor"],
        });
        return equipamentos;
    }
}