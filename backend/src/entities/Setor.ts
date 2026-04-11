import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { NomeSetor } from "../types/NomeSetor.js";
import { Usuario } from "./Usuario.js";

@Entity("setor")
export class Setor {

  @PrimaryGeneratedColumn("uuid")
  id_setor!: string;

  @Column({ type: "enum", enum: NomeSetor, nullable: false })
  nome!: NomeSetor;

  @Column({ type: "text", nullable: true })
  descricao?: string;

  @Column({ type: "boolean", default: true })
  ativo!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  // Um setor pode ter muitos usuários
  @OneToMany(() => Usuario, (usuario) => usuario.setor)
  usuarios?: Usuario[];
}