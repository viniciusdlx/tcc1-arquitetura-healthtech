import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty()
    @Column()
    nome: string;

    @ApiProperty()
    @Column()
    cpf: string;

    @ApiProperty()
    @Column()
    endereco: string;

    @ApiProperty()
    @Column()
    telefone: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    dataNascimento: string;
}
