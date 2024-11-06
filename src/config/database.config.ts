import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbEnvs } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: dbEnvs.url,
    // host: dbEnvs.host,
    // port: dbEnvs.port,
    // username: dbEnvs.username,
    // password: dbEnvs.password,
    // database: dbEnvs.database,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    synchronize: true, // Isso deve ser false em produção
};
