import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AtualizarMedicoDto } from './DTO/atualizar-medico.dto';
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

    @ApiCreatedResponse({
        description: 'Medico atualizado com sucesso.',
    })
    @ApiBadRequestResponse()
    @ApiBody({ type: AtualizarMedicoDto })
    @ApiResponse({ type: Medico })
    @Put(':id')
    async atualizar(
        @Param('id') id: string,
        @Body() atualizarMedicoDto: AtualizarMedicoDto,
    ) {
        try {
            return await this.medicoService.atualizarMedico({
                id: Number(id),
                horarios: atualizarMedicoDto.horarios,
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    @ApiResponse({ isArray: true, type: Medico })
    async getAll(@Res() res: Response) {
        try {
            const medicos = await this.medicoService.buscarTodos();
            res.status(HttpStatus.OK).send(medicos);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
