// import { ExecucaoRepository } from "../../repositories/ExecucaoRepository.js";
// import { PlanoManutencaoRepository } from "../../repositories/PlanoManutencaoRepository.js";

// export class DashboardService {
//   constructor(
//     private execucaoRepo: ExecucaoRepository,
//     private planoRepo: PlanoManutencaoRepository
//   ) {}

//   async getDashboardSummary() {
//     // Busca tudo em paralelo para máxima velocidade
//     const [atrasados, proximosCount, metricasMes] = await Promise.all([
//       this.planoRepo.findAtrasados(),
//       this.planoRepo.countProximos(7),
//       this.execucaoRepo.conformidadeDoMes()
//     ]);

//     // Mapeia os dados da tabela (Card 1 + Tabela)
//     const hoje = new Date();
//     hoje.setHours(0,0,0,0);

//     const listaAtrasados = atrasados.map(p => ({
//       plano: p.titulo,
//       equipamento: p.equipamento?.nome || 'N/A',
//       dataPrevista: p.proxima_em?.toLocaleDateString('pt-BR'),
//       diasAtraso: Math.ceil(Math.abs(hoje.getTime() - new Date(p.proxima_em!).getTime()) / (1000 * 60 * 60 * 24))
//     }));

//     return {
//       cards: {
//         atraso: {
//           valor: atrasados.length,
//           subtexto: "Requerem atenção imediata"
//         },
//         proximos: {
//           valor: proximosCount,
//           subtexto: "Manutenções programadas"
//         },
//         conformidade: {
//           valor: metricasMes.percentual.toFixed(1), // Para exibir "84.0"
//           subtexto: `${metricasMes.realizadas} de ${metricasMes.total} no prazo`
//         },
//         execucoes: {
//           valor: metricasMes.total,
//           subtexto: "Registros de execução"
//         }
//       },
//       tabela: listaAtrasados
//     };
//   }
// }