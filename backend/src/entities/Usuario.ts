import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { Column } from "typeorm/browser";
// import { Perfil } from "../types/Perfil.js";


@Entity("usuario")
export class Usuario{

    @PrimaryGeneratedColumn("uuid")
    id_usuario!: string;

    @Column({type:'text', nullable: false})
    nome!: string;

    @Column({type:'text', nullable: false})
    senha!: string;

    @Column({type:'text', unique: true, nullable: false})
    email!: string;

    // @Column({type:'enum', enum: Perfil, default: Perfil.SOLICITANTE, nullable: false})
    // perfil!: Perfil;
}

