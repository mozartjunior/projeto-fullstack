import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Perfil } from "../types/Perfil.js";


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
}

