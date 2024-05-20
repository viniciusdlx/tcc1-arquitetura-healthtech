import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InserirAdministradorDto } from './DTO/inserir-administrador.dto';
import { Administrador } from './administrador.entity';
import { AdministradorService } from './administrador.service';

@Controller({ path: 'administradores', version: '1' })
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) {}

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
}
