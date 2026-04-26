import type { UUID } from "node:crypto";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { uuid } from "zod";
import { Setor } from "./Setor.js";

@Entity("equipamento")
export class Equipamento {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text', unique: true })
    codigo!: string;

    @Column({ type: 'text' })
    nome!: string;

    @Column({ type: 'text' })
    tipo!: string;

    @ManyToOne(() => Setor, setor => setor.equipamentos)
    @JoinColumn({ name: 'id_setor' })
    setor!: Setor;

    @Column({ name: 'id_setor', type: 'uuid', nullable: true })
    id_setor?: string;

    @Column({ type: 'text', nullable: true })
    fabricante?: string;

    @Column({ type: 'text', nullable: true })
    modelo?: string;

    @Column({ type: 'boolean', default: true })
    ativo!: boolean;
}
