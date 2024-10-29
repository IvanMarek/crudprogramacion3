import { Module, forwardRef } from '@nestjs/common';
import { SeguimientosService } from './seguimientos.service';
import { SeguimientosController } from './seguimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seguimiento } from './entities/seguimiento.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seguimiento]),
    forwardRef(() => UsuariosModule) // Utiliza forwardRef solo si hay dependencias circulares
  ],
  controllers: [SeguimientosController],
  providers: [SeguimientosService],
  exports: [SeguimientosService], // Si necesitas usar el servicio en otros módulos
})
export class SeguimientosModule {}
