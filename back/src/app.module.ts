import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { SeguimientosModule } from "./seguimientos/seguimientos.module";
import { Usuario } from "./usuarios/entities/usuario.entity";
import { Seguimiento } from "./seguimientos/entities/seguimiento.entity";
import { PerfilModule } from "./perfil/perfil.module";
import { Perfil } from "./perfil/entities/perfil.entity";
import { MulterModule } from "@nestjs/platform-express"; // Importar MulterModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3305,
      username: "root",
      password: "Ivan08012000@",
      database: "usuarios",
      synchronize: true,
      entities: [Usuario, Seguimiento, Perfil],
    }),
    UsuariosModule,
    AuthModule,
    SeguimientosModule,
    PerfilModule,
    MulterModule.register({
      // Configurar MulterModule aquí
      limits: { fileSize: 10 * 1024 * 1024 }, // Por ejemplo, 10 MB
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
