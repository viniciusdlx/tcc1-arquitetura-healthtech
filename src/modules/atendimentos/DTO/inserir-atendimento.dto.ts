import { ModalidadeEnum } from '../atendimento.entity';

export class InserirAtendimentoDto {
    data: string;
    hora: string;
    modalidade: ModalidadeEnum;
    local: string;
    medicoId: number;
    pacienteId: number;
    adminId: number;
}
