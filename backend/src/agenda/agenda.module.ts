import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { Agenda } from '../entities/agenda.entity';
import { Medico } from '../entities/medico.entity';
import { Consulta } from '../entities/consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, Medico, Consulta])],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule {}

