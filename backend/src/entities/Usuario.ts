import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Perfil } from "../types/Perfil.js";
import { Setor } from "./Setor.js";
import { Sessao } from "./Sessao.js";


@Entity("usuario")
export class Usuario{

    @PrimaryGeneratedColumn("uuid")
    id_usuario!: string;

    @Column({type:'text', nullable: false})
    nome!: string;

    @Column({type:'text', nullable: false})
    senha_hash!: string;

    @Column({type:'text', unique: true, nullable: false})
    email!: string;

    @Column({type:'enum', enum: Perfil, nullable: false})
    perfil!: Perfil;

    @Column({ type: "boolean", default: true })
    ativo!: boolean;

    @ManyToOne(() => Setor, (setor) => setor.usuarios, { nullable: false })
    @JoinColumn({ name: "id_setor" })
    setor!: Setor;

    @OneToMany(() => Sessao, (sessao) => sessao.usuario)
    sessoes!: Sessao[];

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
}

