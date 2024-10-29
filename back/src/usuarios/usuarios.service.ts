import { HttpException, HttpStatus, Injectable,  NotFoundException  } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });

    if (usuarioExistente) {
      throw new HttpException('Ya existe un usuario con ese E-mail', HttpStatus.BAD_REQUEST);
    }

    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({ usuarioId: id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ usuarioId: id });
    if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    Object.assign(usuario, updateUsuarioDto); // Asigna los valores del DTO al usuario existente
    return this.usuarioRepository.save(usuario);
}


  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOneBy({ usuarioId: id });
    if (!usuario) {
      throw new Error('usuario no encontrado');
    }
    usuario.eliminado = true;  // Borrado lógico
    await this.usuarioRepository.save(usuario);
  }

  async getemail(email:string){

    const userFound =await this.usuarioRepository.findOne({
        where:{
            email
        }
    })

    if (!userFound){
        return null;
    }
    return userFound
}
async cambiarEstadoUsuario(id: number, nuevoEstado: boolean): Promise<Usuario> {
  const usuario = await this.usuarioRepository.findOneBy({ usuarioId: id });

  if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  usuario.eliminado = nuevoEstado;  // Actualiza el estado
  return this.usuarioRepository.save(usuario);

}
}
