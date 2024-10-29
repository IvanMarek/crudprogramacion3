import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller'; // Si tienes un controlador

@Module({
  imports: [TypeOrmModule.forFeature([Perfil])],
  providers: [PerfilService],
  controllers: [PerfilController], // Si tienes un controlador
  exports: [PerfilService], // Si necesitas usarlo en otro módulo
})
export class PerfilModule {}
