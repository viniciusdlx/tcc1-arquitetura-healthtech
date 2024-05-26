import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum AtendimentoModalidadeEnum {
    PRESENCIAL = 'PRESENCIAL',
    TELEMEDICINA = 'TELEMEDICINA',
}

export enum AtendimentoStatusEnum {
    AGENDADA = 'AGENDADA',
    EM_ANDAMENTO = 'EM ANDAMENTO',
    CONCLUIDA = 'CONCLUÍDA',
    CANCELADA = 'CANCELADA',
}

@Entity('atendimento')
export class Atendimento {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ name: 'data', type: 'date' })
    data: string;

    @Column({ name: 'hora', type: 'time' })
    hora: string;

    @Column({
        name: 'status',
        type: 'varchar',
        enum: AtendimentoStatusEnum,
        nullable: true,
        default: null,
    })
    status: AtendimentoStatusEnum;

    @Column({
        name: 'modalidade',
        type: 'varchar',
        enum: AtendimentoModalidadeEnum,
    })
    modalidade: AtendimentoModalidadeEnum;

    @Column({
        name: 'local',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null,
    })
    local: string;

    @Column({
        name: 'url',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null,
    })
    url: string;

    @Column({ name: 'medico_id', type: 'int', width: 11 })
    medicoId: number;

    @Column({ name: 'paciente_id', type: 'int', width: 11 })
    pacienteId: number;

    @Column({ name: 'admin_id', type: 'int', width: 11 })
    adminId: number;

    @CreateDateColumn({ type: 'date' })
    dataCriacao: Date;

    @UpdateDateColumn({ type: 'date' })
    dataAtualizacao: Date;
}
