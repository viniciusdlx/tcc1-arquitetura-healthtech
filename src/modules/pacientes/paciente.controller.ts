import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InserirPacienteDto } from './DTO/inserir-paciente.dto';
import { Paciente } from './paciente.entity';
import { PacienteService } from './paciente.service';

@Controller({ path: 'pacientes', version: '1' })
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

    @ApiTags('Pacientes')
    @Post()
    async inserirPaciente(
        @Body() inserirPacienteDto: InserirPacienteDto,
    ): Promise<Paciente> {
        try {
            return await this.pacienteService.inserirPaciente(
                inserirPacienteDto,
            );
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
