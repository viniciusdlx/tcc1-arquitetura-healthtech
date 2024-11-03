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
        const dataAtual = new Date()
            .toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            .split('/')
            .reverse()
            .join('-');
        const horaAtual = new Date()
            .toLocaleString('pt-br')
            .split(',')[1]
            .slice(0, 6)
            .trim();

        const medico = await this.medicoService.buscarMedicoPorId(
            inserirAtendimentoDto.medicoId,
        );

        const horarioMedicoDisponivel = await this.verificarDisponibilidade(
            medico,
            {
                data: inserirAtendimentoDto.data,
                hora: inserirAtendimentoDto.hora,
            },
        );

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

        if (!horarioMedicoDisponivel) {
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
        const atendimentos = await this.repositoryAtendimento.find({
            select: { data: true, hora: true },
            where: { medicoId: medico.id },
        });

        const diaSemana = new Date(dataHorario.data + 'T00:00:00')
            .toLocaleDateString('pt-BR', { weekday: 'short' })
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\W+/g, '')
            .toLowerCase();

        // verifica se o medico já não tem agendamento na data informada
        // se for true, tem o atendimento agendado, se for false não tem agendado
        const verificaAtendimentosAgendados = atendimentos.some(
            (atendimento) =>
                atendimento.data === dataHorario.data &&
                atendimento.hora === dataHorario.hora,
        );

        // verifica se o medico está com horario e data informado cadastrado
        // se for true, tem o horiario cadastrado, se for false não tem cadastrado
        const verificaHorariosMedico = medico.horarios.some(
            (item) =>
                item.dia === diaSemana &&
                item.horarios.includes(dataHorario.hora),
        );

        // retorna true se ter horario disponivel com nenhum atendimento agendado (true / false) e false se não ter horario disponivel e com atendimento agendados (false/true)
        const disponibilidade =
            verificaHorariosMedico && !verificaAtendimentosAgendados;

        return disponibilidade;
    }

    async cancelarAtendimento(id: string): Promise<void> {
        try {
            const atendimento = await this.repositoryAtendimento.findOne({
                where: { id: Number(id) },
            });

            if (!atendimento) {
                throw new Error('Atendimento não encontrado');
            }

            if (atendimento.status === AtendimentoStatusEnum.CANCELADA) {
                throw new Error('Atendimento já está cancelado');
            }

            atendimento.status = AtendimentoStatusEnum.CANCELADA;

            await this.repositoryAtendimento.save(atendimento);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async buscarPorPacienteId(id: string): Promise<Atendimento[]> {
        try {
            const atendimentos = await this.repositoryAtendimento.find({
                where: { pacienteId: Number(id) },
            });

            return atendimentos;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async buscaPorMedicoId(id: string): Promise<Atendimento[]> {
        try {
            const atendimentos = await this.repositoryAtendimento.find({
                where: { medicoId: Number(id) },
            });

            return atendimentos;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async buscarTodos(): Promise<Atendimento[]> {
        try {
            const atendimentos = await this.repositoryAtendimento.find();

            return atendimentos;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
