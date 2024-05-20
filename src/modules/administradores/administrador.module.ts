import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorController } from './administrador.controller';
import { Administrador } from './administrador.entity';
import { AdministradorService } from './administrador.service';

@Module({
    imports: [TypeOrmModule.forFeature([Administrador])],
    controllers: [AdministradorController],
    providers: [AdministradorService],
    exports: [],
})
export class AdministradorModule {}
