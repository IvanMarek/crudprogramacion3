import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguimiento } from './entities/seguimiento.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class SeguimientosService {
  constructor(
    @InjectRepository(Seguimiento)
    private readonly seguimientoRepository: Repository<Seguimiento>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async seguir(createSeguimientoDto: CreateSeguimientoDto): Promise<Seguimiento> {
    const { seguidorId, seguidoId } = createSeguimientoDto;

    // Verificar que el seguidor y el seguido existan
    const seguidor = await this.usuarioRepository.findOne({ where: { usuarioId: seguidorId } });
    const seguido = await this.usuarioRepository.findOne({ where: { usuarioId: seguidoId } });

    if (!seguidor || !seguido) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Crear el nuevo seguimiento usando solo seguidorId y seguidoId
    const nuevoSeguimiento = this.seguimientoRepository.create({
      seguidorId: seguidorId,
      seguidoId: seguidoId,
    });

    return await this.seguimientoRepository.save(nuevoSeguimiento);
  }

  async dejarDeSeguir(seguidorId: number, seguidoId: number): Promise<void> {
    const seguimiento = await this.seguimientoRepository.findOne({
      where: {
        seguidorId: seguidorId,
        seguidoId: seguidoId,
      },
    });

    console.log(seguimiento)

    if (!seguimiento) {
      throw new NotFoundException('No se encontró el seguimiento');
    }

    await this.seguimientoRepository.remove(seguimiento);
  }

  async findAll(): Promise<Seguimiento[]> {
    return await this.seguimientoRepository.find();
}

}
