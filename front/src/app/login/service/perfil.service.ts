import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class CreatePerfilDto {
  usuarioId?: number; // ID del usuario asociado al perfil
  nombre?: string; // Nombre del usuario
  apellido?: string; // Apellido del usuario
  biografia?: string; // Biografía del usuario
  foto?: string; // URL de la foto de perfil
}
export class UpdatePerfilDto {
  nombre?: string; // Nombre del usuario
  apellido?: string; // Apellido del usuario
  biografia?: string; // Biografía del usuario
  foto?: string; // URL de la foto de perfil
}



@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private apiUrl = 'http://localhost:3000/perfil'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  createPerfil(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updatePerfil(usuarioId: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${usuarioId}`, usuario); // Asegúrate de que el endpoint sea correcto
  }

  getPerfil(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${usuarioId}`);
  }
}