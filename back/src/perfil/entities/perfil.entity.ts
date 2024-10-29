import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('perfil') // Nombre de la tabla en la base de datos

export class Perfil {
  @PrimaryGeneratedColumn()
  id: number; // ID único del perfil

  @Column()
  usuarioId: number; // Clave foránea que referencia al usuario

  @Column({ nullable: true })
  nombre: string; // Nombre del usuario

  @Column({ nullable: true })
  apellido: string; // Apellido del usuario

  @Column({ type: 'text', nullable: true })
  biografia: string; // Biografía del usuario

  @Column({ nullable: true })
  foto: string; // URL de la foto de perfil
}
