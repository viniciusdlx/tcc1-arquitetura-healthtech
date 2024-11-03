import { ApiProperty } from '@nestjs/swagger';
import { HorariosMedico } from '../medico.entity';

export class InserirMedicoDto {
    @ApiProperty()
    nome: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty()
    crm: string;

    @ApiProperty()
    especialidade: string;

    @ApiProperty()
    telefone: string;

    @ApiProperty()
    email: string;

    @ApiProperty({
        example: [
            {
                dia: 'seg',
                horarios: ['07:00', '08:00', '09:00', '10:00', '11:00'],
            },
        ],
    })
    horarios: HorariosMedico[];
}
