import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn } from "typeorm";
import { Equipamento } from "./Equipamento.js";
import { Usuario } from "./Usuario.js";

@Entity("plano_manutencao")
export class PlanoManutencao {
  @PrimaryGeneratedColumn()
  id: number;

  // FK -> equipamento
  @ManyToOne(() => Equipamento, { nullable: false })
  @JoinColumn({ name: "equipamento_id" })
  equipamento: Equipamento;

  @Column({ type: "text", nullable: false })
  titulo: string;

  @Column({ type: "text", nullable: true })
  descricao: string | null;

  @Column({ type: "int", nullable: false })
  periodicidade_dias: number;

  // FK -> usuario (técnico responsável padrão)
  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "tecnico_id" })
  tecnico: Usuario | null;

  @Column({ type: "date", nullable: false })
  proxima_em: Date;

  @Column({ type: "boolean", default: true })
  ativo: boolean;
}