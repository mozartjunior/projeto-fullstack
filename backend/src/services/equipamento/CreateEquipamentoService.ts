export class CreateEquipamentoService {
    constructor(private equipamentoRepository: any) {}

    async execute(data: any){
        if(!data.codigo || !data.nome || !data.tipo || !data.localizacao){
            throw new Error("Campos obrigatorios: codigo, nome, tipo e localizacao");
        }

        const exists = await this.equipamentoRepository.findByCodigo(data.codigo);

        if(exists){
            throw new Error("Ja existe um equipamento com esse codigo.");
        }

        const equipamento = {
            codigo: data.codigo,
            nome: data.nome,
            tipo: data.tipo,
            localizacao: data.localizacao,
            fabricante: data.fabricante || null,
            modelo: data.modelo || null,
            ativo: data.ativo ?? true,
        }

        return this.equipamentoRepository.create(equipamento)
    }
}