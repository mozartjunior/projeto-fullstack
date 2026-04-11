import type { UUID } from "node:crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { uuid } from "zod";

@Entity("equipamento")
export class Equipamento {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'text', unique: true })
    codigo!: string;

    @Column({ type: 'text' })
    nome!: string;

    @Column({ type: 'text' })
    tipo!: string;

    @Column({ type: 'text' })
    localizacao!: string;

    @Column({ type: 'text', nullable: true })
    fabricante?: string;

    @Column({ type: 'text', nullable: true })
    modelo?: string;

    @Column({ type: 'boolean', default: true })
    ativo!: boolean;
}
