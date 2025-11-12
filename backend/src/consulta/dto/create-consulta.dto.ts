import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateConsultaDto {
  @IsNotEmpty({ message: 'Dia é obrigatório' })
  @IsString()
  dia: string;

  @IsNotEmpty({ message: 'Horário é obrigatório' })
  @IsString()
  horario: string;

  @IsNotEmpty({ message: 'Médico ID é obrigatório' })
  @IsNumber()
  medico_id: number;
}

