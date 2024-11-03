import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { InserirMedicoDto } from './DTO/inserir-medico.dto';
import { Medico } from './medico.entity';
import { MedicoService } from './medico.service';

@ApiTags('Medicos')
@Controller('medicos')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}

    @ApiCreatedResponse({
        description: 'Medico cadastrado com sucesso.',
    })
    @ApiBadRequestResponse()
    @ApiBody({ type: InserirMedicoDto })
    @ApiResponse({ type: Medico })
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

    @Get()
    @ApiResponse({ isArray: true, type: Medico })
    async getAll() {
        try {
            return await this.medicoService.buscarTodos();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
