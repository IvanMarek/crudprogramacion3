import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/usuarios';  // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) { }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}`);
  }

  findOne(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario);
  }
  cambiarEstadoUsuario(usuarioId: number, nuevoEstado: boolean): Observable<any> {
    const url = `http://localhost:3000/usuarios/${usuarioId}/estado`;
    return this.http.patch(url, { eliminado: nuevoEstado });
}

}