import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InserirMedicoDto } from './DTO/inserir-medico.dto';
import { MedicoService } from './medico.service';

@Controller('medicos')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}

    @ApiTags('Medicos')
    @Post()
    async inserirMedico(@Body() inserirMedicoDto: InserirMedicoDto) {
        try {
            return await this.medicoService.inserirMedico({
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
}
