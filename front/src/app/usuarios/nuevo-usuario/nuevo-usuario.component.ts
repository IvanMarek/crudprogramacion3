import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de que el servicio esté correctamente importado
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
  nombreUsuario: string = '';
  contrasena: string = '';
  rol: string = '';
  eliminado: boolean = false;
  mensajeExito: string = '';  // Variable para mensaje de éxito
  mensajeError: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  crearUsuario(): void {
    if (this.nombreUsuario && this.contrasena && this.rol) {
      const nuevoUsuario = {
        nombreUsuario: this.nombreUsuario,
        contrasena: this.contrasena,
        rol: this.rol,
        eliminado: this.eliminado,
      };

      this.loginService.register(nuevoUsuario).subscribe({
        next: () => {
          this.mensajeExito = 'Usuario Creado Con Éxito';  // Establece el mensaje de éxito
          this.mensajeError = '';  // Limpia el mensaje de error
          this.limpiarCampos()
          setTimeout(() => {
            this.router.navigate(['/usuario/listar']); // Redirige después de un breve retraso
          }, 2000);
        },
        error: (err) => {
          this.mensajeError = 'Error al crear el usuario';  // Manejo de errores
          console.error('Error al guardar el empleado:', err);
        }
      });
    } else {
      this.mensajeError = 'Por favor complete todos los campos.';  // Mensaje si faltan datos
    }
  }

  limpiarCampos(): void {
    this.nombreUsuario = '';
    this.contrasena = '';
    this.rol = '';
    this.eliminado = false;
  }


  camposValidos(): boolean {
    return this.nombreUsuario.trim() !== '' &&
           this.contrasena.trim() !== '' &&
           this.rol.trim() !== '';
  }
}
