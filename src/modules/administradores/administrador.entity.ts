import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('administrador')
export class Administrador {
    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty()
    @Column({
        name: 'nome',
        type: 'varchar',
        length: 255,
    })
    nome: string;

    @ApiProperty()
    @Column({
        name: 'cpf',
        type: 'varchar',
        length: 255,
    })
    cpf: string;

    @ApiProperty()
    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
    })
    email: string;

    @ApiProperty()
    @Column({
        name: 'telefone',
        type: 'varchar',
        length: 255,
    })
    telefone: string;

    @ApiProperty()
    @Column({ name: 'data_nascimento', type: 'date' })
    dataNascimento: string;
}
