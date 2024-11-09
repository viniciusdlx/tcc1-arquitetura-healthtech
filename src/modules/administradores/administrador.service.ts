import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InserirAdministradorDto } from './DTO/inserir-administrador.dto';
import { Administrador } from './administrador.entity';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(Administrador)
        private readonly adminRepository: Repository<Administrador>,
    ) {}

    async inserirAdmin(
        inserirAdministradorDto: InserirAdministradorDto,
    ): Promise<Administrador> {
        try {
            const novoAdministrador = await this.adminRepository.save({
                cpf: inserirAdministradorDto.cpf,
                dataNascimento: inserirAdministradorDto.dataNascimento,
                email: inserirAdministradorDto.email,
                nome: inserirAdministradorDto.nome,
                telefone: inserirAdministradorDto.telefone,
            });

            return novoAdministrador;
        } catch (error) {
            throw new ExceptionsHandler(error.message);
        }
    }

    async buscarTodos(): Promise<Administrador[]> {
        try {
            const admins = await this.adminRepository.find();

            console.log('admins.length -> ', admins.length);

            return admins;
        } catch (error) {
            throw new ExceptionsHandler(error.message);
        }
    }
}
