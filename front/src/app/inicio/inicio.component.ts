import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { NgModule } from '@angular/core';
import { LoginService } from '../login/service/login.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../usuarios/models/usuario.models';
import { SeguimientoService } from '../login/service/seguimiento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [FormsModule, CommonModule],
})
export class InicioComponent implements OnInit {
  nuevaPublicacion: string = '';
  imagenPublicacion: string | ArrayBuffer | null = null; // Cambiado para incluir 'null'
  publicaciones: any[] = []; // Suponiendo que tienes un array de publicaciones
  usuariosRecomendados: Usuario[] = []; // Array para almacenar usuarios traídos del backend
  seguimientos: any[] = []; // Array para almacenar los seguimientos del usuario
  mensaje: string | null = null;
  usuarioLogueadoId: number = 0; // ID del usuario logueado, cámbialo según tu lógica

  constructor(
    private loginService: LoginService,
    private seguimientoService: SeguimientoService,
    private router: Router
  ) {}

  irALogin() {
    this.router.navigate(['inicio']); // Cambia la ruta según tu configuración
  }

  irAPerfil() {
    this.router.navigate(['perfil']); // Cambia la ruta según tu configuración
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }

  irAGestionUsuarios() {
    this.router.navigate(['/gestion-usuarios']);
  }


  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarSeguimientos(); // Llama a cargarSeguimientos al iniciar el componente
  }

  cargarUsuarios(): void {
    this.loginService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        // Especifica el tipo aquí
        console.log(usuarios);
        if (usuarios) {
          this.usuariosRecomendados = usuarios; // Asigna los usuarios traídos al array
        }
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
    this.usuarioLogueadoId = Number(localStorage.getItem('userId'));
  }

  cargarSeguimientos(): void {
    this.seguimientoService.getSeguimientos().subscribe(
      (seguimientos: any[]) => {
        this.seguimientos = seguimientos; // Almacena los seguimientos en el array
        this.actualizarEstadoUsuarios(); // Actualiza el estado de los usuarios recomendados
      },
      (error) => {
        console.error('Error al cargar seguimientos:', error);
      }
    );
  }

  actualizarEstadoUsuarios(): void {
    // Marca a los usuarios recomendados como seguidos si están en el array de seguimientos
    this.usuariosRecomendados.forEach((usuario) => {
      const misSeguidos = this.seguimientos.filter(
        (seguimiento) => seguimiento.seguidorId == this.usuarioLogueadoId
      );
      console.log(misSeguidos);
      usuario.seguido = misSeguidos.some(
        (seg) => seg.seguidoId === usuario.usuarioId
      );
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result !== undefined) {
          this.imagenPublicacion = e.target.result; // Almacena la imagen seleccionada
        }
      };
      reader.readAsDataURL(file); // Lee el archivo como URL de datos
    }
  }

  crearPublicacion() {
    const autor = this.usuariosRecomendados.find(
      (user) => user.usuarioId == this.usuarioLogueadoId
    );
    const nombreAutor = autor?.nombreUsuario;
    const nuevaPublicacion = {
      contenido: this.nuevaPublicacion,
      imagen: this.imagenPublicacion,
      autor: nombreAutor, // Cambia esto por el nombre del usuario logueado
    };

    this.publicaciones.push(nuevaPublicacion); // Agrega la nueva publicación al feed
    this.mensaje = 'Publicación creada con éxito'; // Mensaje de éxito
    this.nuevaPublicacion = ''; // Limpiar el campo de texto
    this.imagenPublicacion = null; // Limpiar la previsualización de imagen
  }

  seguirUsuario(usuario: Usuario) {
    const seguimientoData = {
      seguidorId: this.usuarioLogueadoId, // ID del usuario logueado
      seguidoId: usuario.usuarioId, // ID del usuario a seguir
    };

    this.seguimientoService.seguir(seguimientoData).subscribe(
      (response) => {
        console.log('Seguido con éxito:', response);
        usuario.seguido = true; // Actualiza el estado del usuario
      },
      (error) => {
        console.error('Error al seguir al usuario:', error);
      }
    );
  }

  dejarDeSeguirUsuario(usuario: Usuario) {
    const seguimientoData = {
      seguidorId: this.usuarioLogueadoId, // ID del usuario logueado
      seguidoId: usuario.usuarioId, // ID del usuario a dejar de seguir
    };

    this.seguimientoService.dejarDeSeguir(seguimientoData).subscribe(
      (response) => {
        console.log('Dejado de seguir con éxito:', response);
        usuario.seguido = false; // Actualiza el estado del usuario
      },
      (error) => {
        console.error('Error al dejar de seguir al usuario:', error);
      }
    );
  }
}
