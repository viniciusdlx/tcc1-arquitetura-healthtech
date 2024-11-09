import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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
    async buscarTodos(@Res() res: Response) {
        try {
            const pacientes = await this.pacienteService.buscarTodos();
            res.status(HttpStatus.OK).send(pacientes);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
