import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEspecialidadeDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  nome: string;
}

