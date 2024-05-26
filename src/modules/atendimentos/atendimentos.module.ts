import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoModule } from '../medicos/medico.module';
import { Atendimento } from './atendimento.entity';
import { AtendimentosController } from './atendimentos.controller';
import { AtendimentosService } from './atendimentos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Atendimento]), MedicoModule],
    controllers: [AtendimentosController],
    providers: [AtendimentosService],
    exports: [],
})
export class AtendimentosModule {}
