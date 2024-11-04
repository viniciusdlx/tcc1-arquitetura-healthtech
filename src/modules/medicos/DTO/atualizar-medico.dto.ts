import { ApiProperty } from '@nestjs/swagger';
import { HorariosMedico } from '../medico.entity';

export class AtualizarMedicoDto {
    id?: number;

    @ApiProperty({
        type: 'object',
        description: 'Horários disponíveis por dia da semana',
        example: [
            {
                dia: 'seg',
                horarios: ['07:00', '08:00', '09:00', '10:00', '11:00'],
            },
            {
                dia: 'ter',
                horarios: [],
            },
            {
                dia: 'qua',
                horarios: [],
            },
            {
                dia: 'qui',
                horarios: [],
            },
            {
                dia: 'sex',
                horarios: [],
            },
            {
                dia: 'sab',
                horarios: [],
            },
            {
                dia: 'dom',
                horarios: [],
            },
        ],
    })
    horarios: HorariosMedico[];
}
