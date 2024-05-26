import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoController } from './medico.controller';
import { Medico } from './medico.entity';
import { MedicoService } from './medico.service';

@Module({
    imports: [TypeOrmModule.forFeature([Medico])],
    controllers: [MedicoController],
    providers: [MedicoService],
    exports: [MedicoService],
})
export class MedicoModule {}
