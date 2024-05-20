import { ApiProperty } from '@nestjs/swagger';

export class InserirPacienteDto {
    @ApiProperty()
    nome: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty()
    endereco: string;

    @ApiProperty()
    telefone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    dataNascimento: string;
}
