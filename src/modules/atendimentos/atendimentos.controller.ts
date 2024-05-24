import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InserirAtendimentoDto } from './DTO/inserir-atendimento.dto';
import { AtendimentosService } from './atendimentos.service';

@Controller('atendimentos')
export class AtendimentosController {
    constructor(private readonly atendimentoService: AtendimentosService) {}

    @Post()
    async inserirAtendimento(
        @Body() inserirAtendimentoDto: InserirAtendimentoDto,
    ) {
        try {
            const atendimento =
                await this.atendimentoService.inserirAtendimento(
                    inserirAtendimentoDto,
                );
            return atendimento;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
