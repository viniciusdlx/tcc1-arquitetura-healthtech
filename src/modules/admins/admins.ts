import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class Admins {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 255,
  })
  nome: string;

  @Column({
    name: 'cpf',
    type: 'varchar',
    length: 255,
  })
  cpf: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    name: 'telefone',
    type: 'varchar',
    length: 255,
  })
  telefone: string;

  @Column({ name: 'data_nascimento', type: 'date' })
  dataNascimento: string;
}
