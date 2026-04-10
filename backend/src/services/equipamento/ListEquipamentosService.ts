export class ListEquipamentoService {
    private equipamentoRepository: any;

    constructor(equipamentoRepository: any) {
        this.equipamentoRepository = equipamentoRepository;
    }

    async execute() {
        return await this.equipamentoRepository.list();
    }
}