import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilDto } from './create-perfil.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePerfilDto {
  @IsOptional()
  @IsString()
  nombre?: string; // Nombre del usuario

  @IsOptional()
  @IsString()
  apellido?: string; // Apellido del usuario

  @IsOptional()
  @IsString()
  biografia?: string; // Biografía del usuario

  @IsOptional()
  @IsString()
  foto?: string; // URL de la foto de perfil
}
