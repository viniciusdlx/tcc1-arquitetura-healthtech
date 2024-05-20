import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
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
