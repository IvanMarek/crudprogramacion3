// src/seguimientos/entities/seguimiento.entity.ts

import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seguimientos')
export class Seguimiento {
    @PrimaryGeneratedColumn()
    id_seguimiento: number;
    
    @PrimaryColumn()
    seguidorId: number;

    @PrimaryColumn()
    seguidoId: number;
}
