import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

@Module({
  imports: [],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [],
})
export class PacientesModule {}
