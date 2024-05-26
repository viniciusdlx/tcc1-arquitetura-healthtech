import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AdministradorModule } from './modules/administradores/administrador.module';
import { AtendimentosModule } from './modules/atendimentos/atendimentos.module';
import { MedicoModule } from './modules/medicos/medico.module';
import { PacienteModule } from './modules/pacientes/paciente.module';

@Module({
    imports: [
        DatabaseModule,
        PacienteModule,
        MedicoModule,
        AtendimentosModule,
        AdministradorModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
