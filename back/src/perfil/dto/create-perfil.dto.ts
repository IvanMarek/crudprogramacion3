import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePerfilDto {
  @IsNotEmpty()
  usuarioId: number; // ID del usuario asociado al perfil

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
