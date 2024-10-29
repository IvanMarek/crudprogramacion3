import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { loginDto } from './dto/login.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuariosService
    ){}

    @Post('register')
    register(
        @Body()registerDto: CreateUsuarioDto,
    ){
        return this.authService.register(registerDto)
    };

    @Post('login')
    login(@Body() loginDto: loginDto){
        return this.authService.login(loginDto);
    }

    @Get()
    findAll(){
        return this.usuarioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usuarioService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
      return this.authService.update(+id, updateUsuarioDto);
    }
}
