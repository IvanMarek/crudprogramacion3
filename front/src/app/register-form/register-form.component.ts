import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../login/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/service/login.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NuevoUsuarioComponent } from '../usuarios/nuevo-usuario/nuevo-usuario.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent{
  registerForm: FormGroup;
  correos: string[] = [];

  constructor(private fb: FormBuilder, private service:AuthService, private router: Router, private registerservice:LoginService ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(60)], []],
      username: ['', [Validators.required]], // Campo usuario obligatorio
      password: ['', [Validators.required, this.passwordStrengthValidator]], // Campo contraseña obligatorio
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }



  passwordsMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
  
    if (!password) {
      return null;
    }
  
    // Verificar si la contraseña cumple con los requisitos
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;
  
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength;
  
    return !passwordValid ? { passwordStrength: true } : null;
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    // Validar que todos los campos obligatorios estén completos
    if (this.registerForm.valid) {
      const { email, password, confirmPassword, username } = this.registerForm.value;

      // Verificar que las contraseñas coincidan
      if (password === confirmPassword) {
        this.registerservice.register({ email:email, nombreUsuario: username, contrasena: password }).subscribe((data) => {console.log('Respuesta del servidor:', data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: '¡Registro exitoso!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate([""]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al registrar',
            });
          }
        }, error => {
          if(error.status == 406) {
            Swal.fire({
              icon: 'error',
              title: 'Error: El correo ya está registrado.',
              text: 'Ya existe un usuario con este correo registrado en el sistema, ingrese un correo nuevo'
            });

          } else {
            
            Swal.fire({
              icon: 'error',
              title: 'Error en el servidor',
              text: error.message
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Las contraseñas no coinciden.'
        });
        console.log('Las contraseñas no coinciden');
      }
    } else {
      // Mostrar un mensaje de error si hay campos vacíos
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Por favor complete todos los campos obligatorios.'
      });
      console.log('Los campos obligatorios no están completos');
    }
  }

  navegar(): void {
    this.router.navigate([""]);
  }
}
