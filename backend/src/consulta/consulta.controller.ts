import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { ConsultaFormatInterceptor } from './interceptors/consulta-format.interceptor';

@Controller('consultas')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Get()
  @UseInterceptors(ConsultaFormatInterceptor)
  async listarConsultas() {
    return this.consultaService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarConsulta(@Body() createConsultaDto: CreateConsultaDto) {
    const data = await this.consultaService.create(createConsultaDto);
    return {
      data: [data.id],
      message: 'Consulta criada com sucesso',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async excluirConsulta(@Param('id', ParseIntPipe) id: number) {
    await this.consultaService.delete(id);
    return { message: 'Consulta excluída com sucesso' };
  }
}

