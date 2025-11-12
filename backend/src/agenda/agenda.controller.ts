import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';

@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Get()
  async listarAgendas() {
    return this.agendaService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarAgenda(@Body() createAgendaDto: CreateAgendaDto) {
    const result = await this.agendaService.create(createAgendaDto);
    return {
      id: result.id,
      message: 'Agenda criada com sucesso',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async excluirAgenda(@Param('id', ParseIntPipe) id: number) {
    await this.agendaService.delete(id);
    return { message: 'Agenda excluída com sucesso' };
  }

  @Get('medicos/:id')
  async getByMedicoId(@Param('id', ParseIntPipe) id: number) {
    const data = await this.agendaService.getByMedicoId(id);
    return {
      message: 'Agendas listadas com sucesso',
      data,
    };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.agendaService.getById(id);
    return {
      message: 'Agenda encontrada com sucesso',
      data,
    };
  }
}

