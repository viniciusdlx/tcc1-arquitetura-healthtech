import { Module } from '@nestjs/common';
import { AtendimentosController } from './atendimentos.controller';
import { AtendimentosService } from './atendimentos.service';

@Module({
  imports: [],
  controllers: [AtendimentosController],
  providers: [AtendimentosService],
  exports: [],
})
export class AtendimentosModule {}
