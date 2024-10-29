import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from '../login/service/perfil.service'; // Asegúrate de importar correctamente el servicio

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [FormsModule, CommonModule],
})
export class PerfilComponent implements OnInit {
  usuario = {
    nombre: '',
    apellido: '',
    biografia: '',
    foto: '',
  };

  fotoPreview: string | ArrayBuffer | null = null; // Inicializa como null
  isEditing = false; // Cambia el estado inicial a modo presentación

  constructor(private router: Router, private perfilService: PerfilService) {}


  crearPerfil(): void {
    const formData = new FormData();
    formData.append('nombre', this.usuario.nombre);
    formData.append('apellido', this.usuario.apellido);
    formData.append('biografia', this.usuario.biografia);
  
    if (this.usuario.foto) {
      const base64 = this.usuario.foto.split(',')[1]; // Obtén solo la parte base64 de la cadena
      const blob = this.convertBase64ToBlob(base64, 'image/png'); // Asegúrate de que el MIME sea correcto
      formData.append('foto', blob, 'foto.png'); // Añade el blob como archivo
    }
  
    console.log(this.usuario); // Verifica los datos antes de enviarlos
    this.perfilService.createPerfil(formData).subscribe(
      (response) => {
        console.log(this.usuario);
        console.log('Perfil creado exitosamente:', response);
        this.router.navigate(['/perfil']); // Redirigir al perfil después de la creación
      },
      (error) => {
        console.error('Error al crear el perfil:', error);
      }
    );
  }
  
  convertBase64ToBlob(base64: string, mimeType: string): Blob {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  }


  ngOnInit(): void {
    this.loadPerfil(); // Cargar el perfil al iniciar el componente
  }

  loadPerfil(): void {
    const usuarioId = Number (localStorage.getItem("userId")); // Cambia esto con el ID del usuario autenticado
    this.perfilService.getPerfil(usuarioId).subscribe(
      (data) => {
        console.log(data)
        this.usuario = data || { nombre: '', apellido: '', biografia: '', foto: 'uploads/IconoPerfil.png' }; // Asegura un valor por defecto
        this.fotoPreview = data?.foto || 'uploads/IconoPerfil.png' ; // Asigna la foto si está disponible
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);
      }
    );
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.fotoPreview = e.target.result; // Previsualización
          this.usuario.foto = this.fotoPreview as string; // Asigna la foto como base64
        }
      };
      reader.readAsDataURL(input.files[0]); // Convierte la imagen a Base64
    }
  }

  // Método para guardar los cambios del perfil
  onSubmit(): void {
    const usuarioId = 1; // Cambia esto con el ID del usuario autenticado
    this.perfilService.updatePerfil(usuarioId, this.usuario).subscribe(
      () => {
        console.log('Perfil actualizado:', this.usuario);
        this.isEditing = false; // Cambia a modo presentación después de guardar
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
      }
    );
  }

  onEdit(): void {
    this.isEditing = true; // Cambia a modo edición
  }

  irALogin() {
    this.router.navigate(['inicio']); // Cambia la ruta según tu configuración
  }

  irAPerfil() {
    this.router.navigate(['perfil']); // Cambia la ruta según tu configuración
  }

  cerrarSesion() {
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }
}

