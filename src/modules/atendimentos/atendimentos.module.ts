import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atendimento } from './atendimento.entity';
import { AtendimentosController } from './atendimentos.controller';
import { AtendimentosService } from './atendimentos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Atendimento])],
    controllers: [AtendimentosController],
    providers: [AtendimentosService],
    exports: [],
})
export class AtendimentosModule {}
