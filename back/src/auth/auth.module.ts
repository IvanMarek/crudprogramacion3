import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
    imports: [
      UsuariosModule,
      loginDto,
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
  })
  export class AuthModule {}