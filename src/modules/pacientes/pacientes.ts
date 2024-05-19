import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class Pacientes {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  dataNascimento: string;
}
