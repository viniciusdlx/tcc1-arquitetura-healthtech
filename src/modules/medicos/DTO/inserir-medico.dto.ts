import { HorariosMedico } from '../medico.entity';

export class InserirMedicoDto {
    nome: string;
    cpf: string;
    crm: string;
    especialidade: string;
    telefone: string;
    email: string;
    horarios: HorariosMedico[];
}
