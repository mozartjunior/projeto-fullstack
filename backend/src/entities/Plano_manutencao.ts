import { Entity, PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn } from "typeorm";
import { Equipamento } from "./Equipamento.js";
import { Usuario } from "./Usuario.js";

@Entity("plano_manutencao")
export class PlanoManutencao {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ name: "equipamento_id", type: "int", nullable: false})
  equipamento_id: number | undefined;

  // FK -> equipamento
  @ManyToOne(() => Equipamento, { nullable: false })
  @JoinColumn({ name: "equipamento_id" })
  equipamento: Equipamento | undefined;

  @Column({ type: "text", nullable: false })
  titulo: string | undefined;

  @Column({ type: "text", nullable: true })
  descricao: string | null | undefined;

  @Column({ type: "int", nullable: false })
  periodicidade_dias: number | undefined;

  // FK -> usuario (técnico responsável padrão)
  @Column({ name: "tecnico_id", type: "uuid", nullable: true })
  tecnico_id: string | undefined;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "tecnico_id" })
  tecnico: Usuario | null | undefined;

  @Column({ type: "date", nullable: false })
  proxima_em: Date | undefined;

  @Column({ type: "boolean", default: true })
  ativo: boolean | undefined;
}