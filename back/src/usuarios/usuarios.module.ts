import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), JwtModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports:[UsuariosService, TypeOrmModule]
})
export class UsuariosModule {}
