import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InserirMedicoDto } from './DTO/inserir-medico.dto';
import { Medico } from './medico.entity';

@Injectable()
export class MedicoService {
    constructor(
        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,
    ) {}

    async inserirMedico(inserirMedicoDto: InserirMedicoDto): Promise<Medico> {
        try {
            return await this.medicoRepository.save({
                nome: inserirMedicoDto.nome,
                cpf: inserirMedicoDto.cpf,
                crm: inserirMedicoDto.crm,
                especialidade: inserirMedicoDto.especialidade,
                telefone: inserirMedicoDto.telefone,
                email: inserirMedicoDto.email,
                horarios: inserirMedicoDto.horarios,
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async buscarMedicoPorId(id: number): Promise<Medico> {
        try {
            return await this.medicoRepository.findOne({ where: { id: id } });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
