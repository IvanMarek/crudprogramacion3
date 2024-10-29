import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router){}

  inicioSesion(): void {
    console.log(this.email, this.contrasena);
    this.authService.login(this.email, this.contrasena).subscribe({
        next: (response) => {
            if (response.token) {
                const token = response.token;
                const payload = JSON.parse(atob(token.split('.')[1]));
                const eliminado = payload.eliminado;
                if (eliminado) {
                    alert('Tu cuenta ha sido desactivada. No puedes iniciar sesión.');
                } else {
                    localStorage.setItem('token', token);
                    this.router.navigate(['/inicio']);
                }
            } else {
                alert('Error: no se pudo iniciar sesión. Verifica tus credenciales.');
            }
        },
        error: (err) => {
            console.error('Login Error', err);
            alert('Usuario o contraseña incorrectos.'); 
        }
    });
}
navegar(): void {
    this.router.navigate(["/register"]);
  }

}

