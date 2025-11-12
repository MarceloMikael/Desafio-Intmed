import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { Medico } from '../entities/medico.entity';
import { Especialidade } from '../entities/especialidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medico, Especialidade])],
  controllers: [MedicoController],
  providers: [MedicoService],
  exports: [MedicoService],
})
export class MedicoModule {}

