import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Perfil } from './entities/perfil.entity';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
  ) {}

  // Crear un nuevo perfil
  async create(createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    const perfil = this.perfilRepository.create(createPerfilDto);
    console.log(perfil)
    return this.perfilRepository.save(perfil);
  }

  // Obtener todos los perfiles
  async findAll(): Promise<Perfil[]> {
    return this.perfilRepository.find();
  }

  // Obtener un perfil por ID
  async findOne(id: number): Promise<Perfil> {
    return this.perfilRepository.findOne({ where: { id } });
  }

  // Actualizar un perfil existente
  async update(id: number, updatePerfilDto: UpdatePerfilDto): Promise<Perfil> {
    await this.perfilRepository.update(id, updatePerfilDto);
    return this.findOne(id); // Retorna el perfil actualizado
  }

  // Eliminar un perfil
  async remove(id: number): Promise<void> {
    await this.perfilRepository.delete(id);
  }
}