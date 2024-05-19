import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicos')
export class Medicos {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  crm: string;

  @Column()
  especialidade: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column({ name: 'horarios', type: 'json' })
  horarios: HorariosMedico[];
}

class HorariosMedico {
  dia: string; // seg, ter, qua, qui, sex, sab, dom
  horarios: string[]; // 10:00, 11:00, 12:00, 13:00
}
