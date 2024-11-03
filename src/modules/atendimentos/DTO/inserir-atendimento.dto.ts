import { ApiProperty } from '@nestjs/swagger';
import { AtendimentoModalidadeEnum } from '../atendimento.entity';

export class InserirAtendimentoDto {
    @ApiProperty({ example: '2024-01-01' })
    data: string;

    @ApiProperty({ example: '10:00' })
    hora: string;

    @ApiProperty({ enum: [AtendimentoModalidadeEnum], type: 'enum' })
    modalidade: AtendimentoModalidadeEnum;

    @ApiProperty()
    local: string;

    @ApiProperty()
    medicoId: number;

    @ApiProperty()
    pacienteId: number;

    @ApiProperty()
    adminId: number;
}
