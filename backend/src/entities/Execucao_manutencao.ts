import {  Entity,  PrimaryGeneratedColumn,  Column,  ManyToOne,  JoinColumn,  CreateDateColumn } from 'typeorm';
import { PlanoManutencao } from './Plano_manutencao.js';
import { Usuario } from './Usuario.js';

export enum StatusExecucao {
  REALIZADA = 'realizada',
  PENDENTE = 'pendente',
  NAO_REALIZADA = 'nao_realizada',
}

@Entity('execucao_manutencao')
export class ExecucaoManutencao{
    @PrimaryGeneratedColumn()
    id!: number;
    
@ManyToOne(() => Usuario, {nullable: true})
@JoinColumn({ name: "tecnico_id"})
tecnico!: Usuario;    

@Column({ type: 'date', nullable: false })
dataExecucao!: Date;

@Column({
    type: 'enum',
    enum: StatusExecucao,
    default: StatusExecucao.REALIZADA,
  })
status!: StatusExecucao;

@Column({ type: 'text', nullable: true })
observacoes!: string | null;

@Column({ type: 'boolean', nullable: false })
conformidade!: boolean;

@CreateDateColumn({ type: 'timestamptz' })
timestamp!: Date;


}