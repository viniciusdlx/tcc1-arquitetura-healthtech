import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medico')
export class Medico {
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
    crm: string;

    @ApiProperty()
    @Column()
    especialidade: string;

    @ApiProperty()
    @Column()
    telefone: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column({ name: 'horarios', type: 'json' })
    horarios: HorariosMedico[];
}

export class HorariosMedico {
    dia: string; // seg, ter, qua, qui, sex, sab, dom
    horarios: string[]; // 10:00, 11:00, 12:00, 13:00
}
