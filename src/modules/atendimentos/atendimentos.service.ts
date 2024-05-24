import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InserirAtendimentoDto } from './DTO/inserir-atendimento.dto';
import { Atendimento, ModalidadeEnum } from './atendimento.entity';

@Injectable()
export class AtendimentosService {
    constructor(
        @InjectRepository(Atendimento)
        private readonly repositoryAtendimento: Repository<Atendimento>,
    ) {}

    async inserirAtendimento(
        inserirAtendimentoDto: InserirAtendimentoDto,
    ): Promise<Atendimento> {
        if (
            !Object.keys(ModalidadeEnum).includes(
                inserirAtendimentoDto.modalidade,
            )
        ) {
            throw new Error('Tipo de modalidade inválida');
        }

        if (inserirAtendimentoDto.modalidade === ModalidadeEnum.PRESENCIAL) {
            if (!inserirAtendimentoDto.local) {
                throw new Error('Local não informado');
            }
        }

        try {
            return await this.repositoryAtendimento.save({
                data: inserirAtendimentoDto.data,
                hora: inserirAtendimentoDto.hora,
                modalidade: inserirAtendimentoDto.modalidade,
                local: inserirAtendimentoDto.local,
                medicoId: inserirAtendimentoDto.medicoId,
                pacienteId: inserirAtendimentoDto.pacienteId,
                adminId: inserirAtendimentoDto.adminId,
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
