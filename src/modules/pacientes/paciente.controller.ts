import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InserirPacienteDto } from './DTO/inserir-paciente.dto';
import { Paciente } from './paciente.entity';
import { PacienteService } from './paciente.service';

@ApiTags('Pacientes')
@Controller({ path: 'pacientes', version: '1' })
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

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

    @ApiResponse({ isArray: true, type: Paciente })
    @Get()
    async buscarTodos(): Promise<Paciente[]> {
        try {
            return await this.pacienteService.buscarTodos();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
