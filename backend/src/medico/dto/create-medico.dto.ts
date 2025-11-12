import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateMedicoDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'CRM é obrigatório' })
  @IsString()
  crm: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Especialidade ID é obrigatório' })
  @IsNumber()
  especialidade_id: number;
}

