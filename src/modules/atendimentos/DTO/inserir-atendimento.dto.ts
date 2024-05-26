import { AtendimentoModalidadeEnum } from '../atendimento.entity';

export class InserirAtendimentoDto {
    data: string;
    hora: string;
    modalidade: AtendimentoModalidadeEnum;
    local: string;
    medicoId: number;
    pacienteId: number;
    adminId: number;
}
