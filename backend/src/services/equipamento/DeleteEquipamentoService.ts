export class DeleteEquipamentoService {
    constructor(private equipamentoRepository: any){}

    async execute(codigo: string){
        if(!codigo){
            throw new Error("Codigo do equipamento é obrigatório.");
        }
        const equipamento = await this.equipamentoRepository.findByCodigo(codigo);

        if(!equipamento){
            throw new Error("Equipamento não encontrado.");
        }

        if(equipamento.ativo){
            throw new Error("Equipamento ativo não pode ser excluído.");
        }

        equipamento.ativo = false;
        return this.equipamentoRepository.save(equipamento);
    }
}