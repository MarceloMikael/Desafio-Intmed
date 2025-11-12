import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from '../entities/agenda.entity';
import { Medico } from '../entities/medico.entity';
import { Consulta } from '../entities/consulta.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
    @InjectRepository(Consulta)
    private consultaRepository: Repository<Consulta>,
  ) {}

  async getAll() {
    const hoje = new Date().toISOString().split('T')[0];
    const agora = new Date().toTimeString().slice(0, 5);
  
    const agendas = await this.agendaRepository
      .createQueryBuilder('agenda')
      .leftJoinAndSelect('agenda.medico', 'medico')
      .where(
        `
        agenda.dia > :hoje
        OR (
          agenda.dia = :hoje
          AND EXISTS (
            SELECT 1
            FROM unnest(agenda.horarios) AS h
            WHERE h > :agora
          )
        )
        `,
        { hoje, agora },
      )
      .orderBy('agenda.dia', 'ASC')
      .getMany();
  
    const agendasFiltradas = agendas.map((agenda) => {
      if (new Date(agenda.dia).toISOString().split('T')[0] === hoje) {
        agenda.horarios = agenda.horarios.filter((h: string) => h > agora);
      }
      return agenda;
    });
  
    return agendasFiltradas;
  }
  

  async create(createAgendaDto: CreateAgendaDto) {
    const medico = await this.medicoRepository.findOne({
      where: { id: createAgendaDto.medico_id },
    });

    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    const agendaExistente = await this.agendaRepository.findOne({
      where: {
        medicoId: createAgendaDto.medico_id,
        dia: createAgendaDto.dia,
      },
    });

    if (agendaExistente) {
      throw new ConflictException('Já existe uma agenda para este médico neste dia');
    }

    const agenda = this.agendaRepository.create({
      medicoId: createAgendaDto.medico_id,
      dia: createAgendaDto.dia,
      horarios: createAgendaDto.horarios,
    });

    const savedAgenda = await this.agendaRepository.save(agenda);
    return { id: savedAgenda.id };
  }

  async delete(id: number) {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: ['medico'],
    });

    if (!agenda) {
      throw new NotFoundException('Agenda não encontrada');
    }

    const temConsultas = await this.consultaRepository.findOne({
      where: {
        medicoId: agenda.medicoId,
        dia: agenda.dia,
      },
    });

    if (temConsultas) {
      throw new BadRequestException('Não é possível excluir uma agenda com consultas agendadas');
    }

    await this.agendaRepository.remove(agenda);
  }

  async getByMedicoId(medicoId: number) {
    const hoje = new Date().toISOString().split('T')[0];
    const agora = new Date().toTimeString().slice(0, 5);

    const agendas = await this.agendaRepository.find({
      where: { medicoId },
      relations: ['medico'],
      order: { dia: 'ASC' },
    });

    const agendasFiltradas = agendas
      .map((agenda) => {
        if (agenda.dia === hoje) {
          agenda.horarios = agenda.horarios.filter((horario: string) => horario > agora);
        }
        return agenda;
      })
      .filter((agenda) => agenda.dia > hoje || (agenda.dia === hoje && agenda.horarios.length > 0));

    return agendasFiltradas;
  }

  async getById(id: number) {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: ['medico'],
    });

    if (!agenda) {
      throw new NotFoundException('Agenda não encontrada');
    }

    return agenda;
  }

  async removerHorarioDaAgenda(medicoId: number, dia: string, horario: string) {
    const agenda = await this.agendaRepository.findOne({
      where: { medicoId, dia },
    });

    if (!agenda) {
      return;
    }

    const novosHorarios = agenda.horarios.filter((h) => h !== horario);
    agenda.horarios = novosHorarios;
    await this.agendaRepository.save(agenda);
  }

  async adicionarHorarioNaAgenda(medicoId: number, dia: string, horario: string) {
    const agenda = await this.agendaRepository.findOne({
      where: { medicoId, dia },
    });

    if (!agenda) {
      return;
    }

    if (!agenda.horarios.includes(horario)) {
      agenda.horarios.push(horario);
      agenda.horarios.sort();
      await this.agendaRepository.save(agenda);
    }
  }
}

