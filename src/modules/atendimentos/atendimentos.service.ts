import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from '../medicos/medico.entity';
import { MedicoService } from '../medicos/medico.service';
import { InserirAtendimentoDto } from './DTO/inserir-atendimento.dto';
import {
    Atendimento,
    AtendimentoModalidadeEnum,
    AtendimentoStatusEnum,
} from './atendimento.entity';

@Injectable()
export class AtendimentosService {
    constructor(
        @InjectRepository(Atendimento)
        private readonly repositoryAtendimento: Repository<Atendimento>,
        private readonly medicoService: MedicoService,
    ) {}

    async inserirAtendimento(
        inserirAtendimentoDto: InserirAtendimentoDto,
    ): Promise<Atendimento> {
        // valida os dados para inserir atendimento
        await this.validarDadosInserirAtendimento(inserirAtendimentoDto);

        try {
            return await this.repositoryAtendimento.save({
                data: inserirAtendimentoDto.data,
                hora: inserirAtendimentoDto.hora,
                status: AtendimentoStatusEnum.AGENDADA,
                modalidade: inserirAtendimentoDto.modalidade,
                local: inserirAtendimentoDto.local,
                medicoId: inserirAtendimentoDto.medicoId,
                pacienteId: inserirAtendimentoDto.pacienteId,
                adminId: inserirAtendimentoDto.adminId,
            });
            return;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    private async validarDadosInserirAtendimento(
        inserirAtendimentoDto: InserirAtendimentoDto,
    ): Promise<void> {
        const dataAtual = new Date().toISOString().split('T')[0];
        const horaAtual = new Date()
            .toLocaleString('pt-br')
            .split(',')[1]
            .slice(0, 6)
            .trim();

        const medico = await this.medicoService.buscarMedicoPorId(
            inserirAtendimentoDto.medicoId,
        );

        const medicoHorario = await this.verificarDisponibilidade(medico, {
            data: inserirAtendimentoDto.data,
            hora: inserirAtendimentoDto.hora,
        });

        if (
            !inserirAtendimentoDto?.data ||
            inserirAtendimentoDto?.data < dataAtual
        ) {
            throw new Error('Data inválida');
        }

        if (
            !inserirAtendimentoDto?.hora ||
            (inserirAtendimentoDto?.data <= dataAtual &&
                inserirAtendimentoDto?.hora < horaAtual)
        ) {
            throw new Error('Hora inválida');
        }

        if (!medico) {
            throw new Error('Médico inválido');
        }

        if (!medicoHorario) {
            throw new Error('Horário do médico indisponível');
        }

        if (
            !Object.keys(AtendimentoModalidadeEnum).includes(
                inserirAtendimentoDto.modalidade,
            )
        ) {
            throw new Error('Tipo de modalidade inválida');
        }

        if (
            inserirAtendimentoDto.modalidade ===
            AtendimentoModalidadeEnum.PRESENCIAL
        ) {
            if (!inserirAtendimentoDto.local) {
                throw new Error('Local não informado');
            }
        }
    }

    // Função para verificar disponibilidade
    private async verificarDisponibilidade(
        medico: Medico,
        dataHorario: { data: string; hora: string },
    ) {
        const diaSemana = new Date(dataHorario.data + 'T00:00:00')
            .toLocaleDateString('pt-BR', { weekday: 'short' })
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\W+/g, '')
            .toLowerCase();

        return medico.horarios.some(
            (item) =>
                item.dia === diaSemana &&
                item.horarios.includes(dataHorario.hora),
        )
            ? true
            : false;
    }
}
