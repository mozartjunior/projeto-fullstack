// import { Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Column } from "typeorm/browser";

// @Entity("plano_manutencao")
// export class PlanoManutencao {

//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column({ type: 'text', unique: true })
//     codigo!: string;

//     @Column({ type: 'text' })
//     equipamento_id!: number;

//     @Column({ type: 'text' })
//     titulo!: string;

//     @Column({ type: 'text' })
//     descricao!: string;

//     @Column({ type: 'int', nullable: true })
//     periodicidade_dias?: string;

//     @Column({ type: 'int', nullable: true })
//     tecnico_id?: number;

//     @Column({ type: 'date', default: true })
//     proxima_em!: boolean;

//     @Column({ type: 'boolean', default: true })
//     ativo!: boolean;
// }