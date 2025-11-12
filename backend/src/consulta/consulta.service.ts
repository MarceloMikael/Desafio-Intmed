import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from '../entities/consulta.entity';
import { Medico } from '../entities/medico.entity';
import { Agenda } from '../entities/agenda.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { AgendaService } from '../agenda/agenda.service';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private consultaRepository: Repository<Consulta>,
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,
    @Inject(forwardRef(() => AgendaService))
    private agendaService: AgendaService,
  ) {}

  async getAll() {
    const hoje = new Date().toISOString().split('T')[0];
    const agora = new Date().toTimeString().split(' ')[0].substring(0, 5);

    return this.consultaRepository
      .createQueryBuilder('consulta')
      .leftJoinAndSelect('consulta.medico', 'medico')
      .leftJoinAndSelect('medico.especialidade', 'especialidade')
      .where(
        '(consulta.dia > :hoje OR (consulta.dia = :hoje AND consulta.horario > :agora))',
        { hoje, agora },
      )
      .orderBy('consulta.dia', 'ASC')
      .addOrderBy('consulta.horario', 'ASC')
      .getMany();
  }

  async create(createConsultaDto: CreateConsultaDto) {
    const medico = await this.medicoRepository.findOne({
      where: { id: createConsultaDto.medico_id },
    });

    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    const agenda = await this.agendaRepository.findOne({
      where: {
        medicoId: createConsultaDto.medico_id,
        dia: createConsultaDto.dia,
      },
    });

    if (!agenda) {
      throw new BadRequestException('Não há agenda disponível para este médico nesta data');
    }

    if (!agenda.horarios.includes(createConsultaDto.horario)) {
      throw new BadRequestException('Horário não disponível para este médico');
    }

    const consultaExistente = await this.consultaRepository.findOne({
      where: {
        medicoId: createConsultaDto.medico_id,
        dia: createConsultaDto.dia,
        horario: createConsultaDto.horario,
      },
    });

    if (consultaExistente) {
      throw new BadRequestException('Horário já ocupado para este médico');
    }

    const consulta = this.consultaRepository.create({
      dia: createConsultaDto.dia,
      horario: createConsultaDto.horario,
      medicoId: createConsultaDto.medico_id,
      dataAgendamento: new Date(),
    });

    const savedConsulta = await this.consultaRepository.save(consulta);

    await this.agendaService.removerHorarioDaAgenda(
      createConsultaDto.medico_id,
      createConsultaDto.dia,
      createConsultaDto.horario,
    );

    return savedConsulta;
  }

  async delete(id: number) {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['medico'],
    });

    if (!consulta) {
      throw new NotFoundException('Consulta não encontrada');
    }

    await this.consultaRepository.remove(consulta);

    await this.agendaService.adicionarHorarioNaAgenda(
      consulta.medicoId,
      consulta.dia,
      consulta.horario,
    );
  }
}

