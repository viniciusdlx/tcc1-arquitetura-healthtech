import { ApiProperty } from '@nestjs/swagger';

export class InserirAdministradorDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  dataNascimento: string;
}
