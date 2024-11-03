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
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { InserirAdministradorDto } from './DTO/inserir-administrador.dto';
import { Administrador } from './administrador.entity';
import { AdministradorService } from './administrador.service';

@ApiTags('Administradores')
@Controller({ path: 'administradores', version: '1' })
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) {}

    @ApiBadRequestResponse()
    @ApiBody({ type: InserirAdministradorDto })
    @ApiResponse({ type: Administrador })
    @Post()
    async inserirAdmin(
        @Body() inserirAdministradorDto: InserirAdministradorDto,
    ): Promise<Administrador> {
        try {
            return await this.administradorService.inserirAdmin(
                inserirAdministradorDto,
            );
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @ApiResponse({ isArray: true, type: Administrador })
    @Get()
    async buscarTodos(): Promise<Administrador[]> {
        try {
            return await this.administradorService.buscarTodos();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
