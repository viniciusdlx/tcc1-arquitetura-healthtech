import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteController } from './paciente.controller';
import { Paciente } from './paciente.entity';
import { PacienteService } from './paciente.service';

@Module({
    imports: [TypeOrmModule.forFeature([Paciente])],
    controllers: [PacienteController],
    providers: [PacienteService],
    exports: [],
})
export class PacienteModule {}
