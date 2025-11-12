import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Get()
  async listarMedicos() {
    return this.medicoService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarMedico(@Body() createMedicoDto: CreateMedicoDto) {
    const result = await this.medicoService.create(createMedicoDto);
    return {
      id: result.id,
      message: 'Médico criado com sucesso',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async excluirMedico(@Param('id', ParseIntPipe) id: number) {
    await this.medicoService.delete(id);
    return { message: 'Médico excluído com sucesso' };
  }

  @Get('especialidades')
  async getAllEspecialidades() {
    const data = await this.medicoService.getAllEspecialidades();
    return {
      message: 'Especialidades listadas com sucesso',
      data,
    };
  }

  @Get('especialidades/:id')
  async getMedicosByEspecialidadeId(@Param('id', ParseIntPipe) id: number) {
    const data = await this.medicoService.getMedicosByEspecialidadeId(id);
    return {
      message: 'Medicos listados com sucesso',
      data,
    };
  }
}

