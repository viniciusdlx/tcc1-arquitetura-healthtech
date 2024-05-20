import { Module } from '@nestjs/common';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';

@Module({
  imports: [],
  controllers: [MedicosController],
  providers: [MedicosService],
  exports: [],
})
export class MedicoModule {}
