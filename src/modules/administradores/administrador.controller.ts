import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
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
    async buscarTodos(@Res() res: Response) {
        try {
            const admins = await this.administradorService.buscarTodos();
            res.status(HttpStatus.OK).send(admins);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
