import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario.js";

@Entity("sessao")
export class Sessao {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.sessoes, { onDelete: "CASCADE" })
    usuario!: Usuario;

    @Column({ type: "text", nullable: false })
    refresh_token_hash!: string;

    @Column({ type: "timestamptz", nullable: false })
    expires_at!: Date;

    @Column({ type: "timestamptz", nullable: true })
    revoked_at?: Date | null;

    @Column({ type: "text", nullable: true })
    ip?: string | null;

    @Column({ type: "text", nullable: true })
    user_agent?: string | null;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;
}