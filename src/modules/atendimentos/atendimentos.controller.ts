import {
    BadRequestException,
    Body,
    Controller,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { InserirAtendimentoDto } from './DTO/inserir-atendimento.dto';
import { AtendimentosService } from './atendimentos.service';

@Controller('atendimentos')
export class AtendimentosController {
    constructor(private readonly atendimentoService: AtendimentosService) {}

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
