import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class CreateAgendaDto {
  @IsNotEmpty({ message: 'Médico ID é obrigatório' })
  @IsNumber()
  medico_id: number;

  @IsNotEmpty({ message: 'Dia é obrigatório' })
  @IsString()
  dia: string;

  @IsNotEmpty({ message: 'Horários são obrigatórios' })
  @IsArray()
  @ArrayMinSize(1, { message: 'Deve ter pelo menos um horário' })
  @IsString({ each: true })
  horarios: string[];
}

