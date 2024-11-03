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
import { InserirAtendimentoDto } from './DTO/inserir-atendimento.dto';
import { Atendimento } from './atendimento.entity';
import { AtendimentosService } from './atendimentos.service';

@ApiTags('Atendimentos')
@Controller('atendimentos')
export class AtendimentosController {
    constructor(private readonly atendimentoService: AtendimentosService) {}

    @Get('/pacientes/:id')
    async buscarAtendimentosPorPacienteId(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        try {
            const atendimentos =
                await this.atendimentoService.buscarPorPacienteId(id);
            res.status(HttpStatus.OK).send(atendimentos);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/medicos/:id')
    async buscarAtendimentosPorMedicoId(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        try {
            const atendimentos =
                await this.atendimentoService.buscaPorMedicoId(id);
            res.status(HttpStatus.OK).send(atendimentos);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @ApiResponse({ isArray: true, type: Atendimento })
    @Get()
    async buscarTodos(@Res() res: Response) {
        try {
            const atendimentos = await this.atendimentoService.buscarTodos();
            res.status(HttpStatus.OK).send(atendimentos);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @ApiCreatedResponse({
        description: 'Atendimento agendado com sucesso.',
    })
    @ApiBadRequestResponse()
    @ApiBody({ type: InserirAtendimentoDto })
    @ApiResponse({ type: Atendimento })
    @Post()
    async inserirAtendimento(
        @Body() inserirAtendimentoDto: InserirAtendimentoDto,
        @Res() res: Response,
    ) {
        try {
            const atendimento =
                await this.atendimentoService.inserirAtendimento(
                    inserirAtendimentoDto,
                );
            return res.status(HttpStatus.CREATED).send(atendimento);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':id')
    async cancelarAtendimento(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.atendimentoService.cancelarAtendimento(id);
            return res
                .status(HttpStatus.OK)
                .send({ message: 'Atendimento cancelado' });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
