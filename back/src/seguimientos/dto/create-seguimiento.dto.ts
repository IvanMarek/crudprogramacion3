// src/seguimientos/dto/create-seguimiento.dto.ts

import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateSeguimientoDto {
    @IsNotEmpty()
    @IsInt()
    seguidorId: number;

    @IsNotEmpty()
    @IsInt()
    seguidoId: number;
}
