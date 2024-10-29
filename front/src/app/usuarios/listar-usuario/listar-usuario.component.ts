import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../models/usuario.models';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  isLoading = true;

  constructor(private usuarioService: UsuarioService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.usuariosFiltrados = data; // Inicialmente mostramos todos los usuarios
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los usuarios', err);
        this.isLoading = false;
      }
    });
  }

  filtrarUsuarios(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'activos') {
      this.usuariosFiltrados = this.usuarios.filter(usuario => !usuario.eliminado);
    } else {
      this.usuariosFiltrados = this.usuarios; // Muestra todos los usuarios
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      const usuarioId = usuario.usuarioId;

      this.http.patch<Usuario>(`http://localhost:3000/usuarios/${usuarioId}`, { eliminado: true }).subscribe({
        next: (response) => {
          console.log('Usuario eliminado con éxito:', response);
          alert('Usuario eliminado con éxito');
          this.cargarUsuarios(); // Recarga la lista de usuarios después de eliminar uno
        },
        error: (err) => {
          console.log('ID del Usuario:', usuarioId);
          console.error('Error al eliminar el Usuario:', err);
        }
      });
    } else {
      console.log('Operación cancelada');
    }
  }
}
