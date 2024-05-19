import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AdminsModule } from './modules/admins/admins.module';
import { AtendimentosModule } from './modules/atendimentos/atendimentos.module';
import { MedicosModule } from './modules/medicos/medicos.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';

@Module({
  imports: [
    DatabaseModule,
    PacientesModule,
    MedicosModule,
    AtendimentosModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
