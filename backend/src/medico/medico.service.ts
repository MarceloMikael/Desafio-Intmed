import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from '../entities/medico.entity';
import { Especialidade } from '../entities/especialidade.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
    @InjectRepository(Especialidade)
    private especialidadeRepository: Repository<Especialidade>,
  ) {}

  async getAll() {
    return this.medicoRepository.find({
      relations: ['especialidade'],
      order: { nome: 'ASC' },
    });
  }

  async create(createMedicoDto: CreateMedicoDto) {
    const crmExistente = await this.medicoRepository.findOne({
      where: { crm: createMedicoDto.crm },
    });

    if (crmExistente) {
      throw new ConflictException('CRM já cadastrado!');
    }

    const especialidade = await this.especialidadeRepository.findOne({
      where: { id: createMedicoDto.especialidade_id },
    });

    if (!especialidade) {
      throw new NotFoundException('Especialidade não encontrada!');
    }

    const medico = this.medicoRepository.create({
      nome: createMedicoDto.nome,
      crm: createMedicoDto.crm,
      email: createMedicoDto.email,
      especialidadeId: createMedicoDto.especialidade_id,
    });

    const savedMedico = await this.medicoRepository.save(medico);
    return { id: savedMedico.id };
  }

  async delete(id: number) {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) {
      throw new NotFoundException('Médico não encontrado!');
    }
    await this.medicoRepository.remove(medico);
  }

  async getAllEspecialidades() {
    return this.especialidadeRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async getMedicosByEspecialidadeId(id: number) {
    const especialidade = await this.especialidadeRepository.findOne({
      where: { id },
    });

    if (!especialidade) {
      throw new NotFoundException('Especialidade não encontrada!');
    }

    return this.medicoRepository.find({
      where: { especialidadeId: id },
      relations: ['especialidade'],
    });
  }
}

