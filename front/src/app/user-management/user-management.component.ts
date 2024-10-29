import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/models/usuario.models';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../usuarios/service/usuario.service1';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule]
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'estado', 'acciones']; // Define las columnas aquí
  cargando: boolean = false;

  constructor(private usuarioService: UsuarioService,  private dialog: MatDialog) {}


  ngOnInit(): void {
    this.cargarUsuarios();
  }



  cargarUsuarios(): void {
    this.usuarioService.findAll().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios.filter(usuario => !usuario.eliminado); // Solo usuarios activos
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
  cambiarEstadoUsuario(usuario: any): void {
    this.cargando = true;
    console.log('Usuario recibido en cambiarEstadoUsuario:', usuario);
  
    // Verifica todas las propiedades del objeto
    console.log('Todas las propiedades del usuario:', Object.keys(usuario));
  
    // Imprime el usuario y verifica su ID
    console.log('Datos del usuario:', usuario);
    
    // Acceso directo a la propiedad usuarioId
    const usuarioId = usuario.usuarioId;
    console.log('ID del usuario (debería ser 1):', usuarioId);
  
    // Verifica si el ID es undefined
    if (usuarioId === undefined) {
      console.error("El usuario no tiene un ID definido");
      this.cargando = false;
      return;
    }
  
    const nuevoEstado = !usuario.eliminado;
  
    this.usuarioService.cambiarEstadoUsuario(usuarioId, nuevoEstado).subscribe({
      next: () => {
        usuario.eliminado = nuevoEstado; // Cambia el estado en la vista
        console.log('Estado del usuario actualizado:', usuario);
      },
      error: (error) => {
        console.error("Error al cambiar el estado del usuario:", error);
        alert("Ocurrió un error al cambiar el estado del usuario");
      },
      complete: () => {
        this.cargando = false; // Finaliza la carga
      }
    });
  }
  
  editarUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      data: usuario, // Envía los datos del usuario al modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios(); // Recargar la lista de usuarios después de editar
      }
    });}
  


  verPerfil(usuario: Usuario): void {
    console.log('Visualizar perfil de usuario:', usuario);
    // Implementa navegación o lógica de visualización aquí
  }
}
