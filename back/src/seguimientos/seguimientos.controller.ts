import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { SeguimientosService } from './seguimientos.service';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';

@Controller('seguimientos')
export class SeguimientosController {
  constructor(private readonly seguimientosService: SeguimientosService) {}

  @Post()
  async create(@Body() createSeguimientoDto: CreateSeguimientoDto) {
    return await this.seguimientosService.seguir(createSeguimientoDto);
  }

  @Post('dejar-de-seguir')
  async dejarDeSeguir(@Body() body: { seguidorId: number; seguidoId: number }) {
    return await this.seguimientosService.dejarDeSeguir(body.seguidorId, body.seguidoId);
  }

  @Get()
  async findAll() {
    return await this.seguimientosService.findAll();
  }

}
