import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log('path -> ', __dirname + '/../**/*.entity.{js, ts}');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'healthtech.db',
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  synchronize: true, // Sincroniza o esquema do banco de dados com as entidades automaticamente
  // logging: true,
};
