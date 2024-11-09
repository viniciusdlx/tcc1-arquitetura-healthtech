import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InserirPacienteDto } from './DTO/inserir-paciente.dto';
import { Paciente } from './paciente.entity';

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,
    ) {}

    async inserirPaciente(
        inserirPacienteDto: InserirPacienteDto,
    ): Promise<Paciente> {
        try {
            const novoPaciente = await this.pacienteRepository.save({
                nome: inserirPacienteDto.nome,
                cpf: inserirPacienteDto.cpf,
                endereco: inserirPacienteDto.endereco,
                telefone: inserirPacienteDto.telefone,
                email: inserirPacienteDto.email,
                dataNascimento: inserirPacienteDto.dataNascimento,
            });
            return novoPaciente;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async buscarTodos(): Promise<Paciente[]> {
        try {
            const pacientes = await this.pacienteRepository.find();

            console.log('pacientes.length -> ', pacientes.length);

            return pacientes;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
