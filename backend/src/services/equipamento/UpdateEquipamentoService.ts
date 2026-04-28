import { normalizeCodigo } from "../../utils/normalizeCodigo.js";

export class UpdateEquipamentoService {
  constructor(private equipamentoRepository: any) {}

  async execute(codigo: string, data: any) {
    const codigoNormalizado = normalizeCodigo(codigo);

    // 1. Busca a entidade completa pelo código
    const equipamento = await this.equipamentoRepository.findByCodigo(codigoNormalizado);
    
    if (!equipamento) {
      throw new Error(`Equipamento ${codigoNormalizado} não encontrado.`);
    }

    equipamento.nome = data.nome ?? equipamento.nome;
    equipamento.tipo = data.tipo ?? equipamento.tipo;
    equipamento.fabricante = data.fabricante ?? equipamento.fabricante;
    equipamento.modelo = data.modelo ?? equipamento.modelo;
    equipamento.ativo = data.ativo ?? equipamento.ativo;
    equipamento.codigo = codigoNormalizado;
    
    if (data.id_setor) {
      // equipamento.setor = null;
      equipamento.id_setor = data.id_setor;
    }

    return await this.equipamentoRepository.save(equipamento);
  }
}