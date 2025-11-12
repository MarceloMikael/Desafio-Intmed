import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { Consulta } from '../entities/consulta.entity';
import { Medico } from '../entities/medico.entity';
import { Agenda } from '../entities/agenda.entity';
import { AgendaModule } from '../agenda/agenda.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consulta, Medico, Agenda]),
    forwardRef(() => AgendaModule),
  ],
  controllers: [ConsultaController],
  providers: [ConsultaService],
})
export class ConsultaModule {}

