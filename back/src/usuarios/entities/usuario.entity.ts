import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    usuarioId: number;
  
    @Column({ })
    nombreUsuario: string;

    @Column({ unique: true })
    email: string;
  
    @Column()
    contrasena: string;

    @Column({ default: 'usuario' })
    rol: string;
  
    @Column({ default: false })
    eliminado: boolean;

}