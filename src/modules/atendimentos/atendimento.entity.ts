import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty()
    @Column({ name: 'data', type: 'date' })
    data: string;

    @ApiProperty()
    @Column({ name: 'hora', type: 'time' })
    hora: string;

    @ApiProperty()
    @Column({
        name: 'status',
        type: 'varchar',
        enum: AtendimentoStatusEnum,
        nullable: true,
        default: null,
    })
    status: AtendimentoStatusEnum;

    @ApiProperty()
    @Column({
        name: 'modalidade',
        type: 'varchar',
        enum: AtendimentoModalidadeEnum,
    })
    modalidade: AtendimentoModalidadeEnum;

    @ApiProperty()
    @Column({
        name: 'local',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null,
    })
    local: string;

    @ApiProperty()
    @Column({
        name: 'url',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null,
    })
    url: string;

    @ApiProperty()
    @Column({ name: 'medico_id', type: 'int', width: 11 })
    medicoId: number;

    @ApiProperty()
    @Column({ name: 'paciente_id', type: 'int', width: 11 })
    pacienteId: number;

    @ApiProperty()
    @Column({ name: 'admin_id', type: 'int', width: 11 })
    adminId: number;

    @ApiProperty()
    @CreateDateColumn({ type: 'date' })
    dataCriacao: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'date' })
    dataAtualizacao: Date;
}
