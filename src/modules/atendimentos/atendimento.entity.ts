import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum ModalidadeEnum {
  PRESENCIAL = 'PRESENCIAL',
  TELEMEDICINA = 'TELEMEDICINA',
}

@Entity('atendimento')
export class Atendimento {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'data', type: 'date' })
  data: string;

  @Column({ name: 'hora', type: 'time' })
  hora: string;

  @Column({ name: 'modalidade', type: 'text', enum: ModalidadeEnum })
  modalidade: ModalidadeEnum;

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
}
