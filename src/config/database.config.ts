import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admins } from 'src/modules/admins/admins';
import { Atendimentos } from 'src/modules/atendimentos/atendimentos';
import { Medicos } from 'src/modules/medicos/medicos';
import { Pacientes } from 'src/modules/pacientes/pacientes';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'healthtech.db',
  entities: [Admins, Atendimentos, Medicos, Pacientes],
  synchronize: true, // Sincroniza o esquema do banco de dados com as entidades automaticamente
  logging: true,
};
