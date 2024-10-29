import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'] // Asegúrate de que sea 'styleUrls'
})
export class EditarUsuarioComponent implements OnInit {
  nombreUsuario: string = '';
  contrasena: string = '';
  rol: string = '';
  eliminado: boolean = false;
  mensajeExito: string = '';  // Variable para mensaje de éxito
  mensajeError: string = '';
  

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient
  ) {}

  usuario: any = {};

  ngOnInit() {
    const usuarioId = this.route.snapshot.paramMap.get('id');
    if (usuarioId) {
      this.cargarUsuario(usuarioId);
    }
  }

  cargarUsuario(usuarioId: string): void {
    this.http.get<any>(`http://localhost:3000/usuarios/${usuarioId}`).subscribe({
      next: (data) => {
        this.usuario = data;
        this.nombreUsuario = data.nombreUsuario;
        this.rol = data.rol;
        console.log('Datos del usuario cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar los datos del usuario', err);
      }
    });
  }

  actualizarUsuario() {
    const usuarioId = this.route.snapshot.paramMap.get('id');
    if (usuarioId) {
      const usuarioActualizado = {
        nombreUsuario: this.nombreUsuario,
        contrasena: this.contrasena,
        rol: this.rol
      };

      this.http.patch<any>(`http://localhost:3000/auth/${usuarioId}`, usuarioActualizado).subscribe({
        next: (response) => {
          console.log('Usuario actualizado con éxito:', response);
          this.mensajeExito = 'Usuario Actualizado Con Éxito';
          setTimeout(() => {
            this.router.navigate(['/usuario/listar']);
          }, 2000);
        },
        error: (err) => {
          this.mensajeError = 'Error al Actualizar el Usuario';
          console.error('Error al actualizar el usuario:', err);
        }
      });
    }
  }

  cancelar() {
    alert('Usuario NO actualizado, operación cancelada.');
    this.router.navigate(['/usuario/listar']);
  }
}

