import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  private baseUrl = 'http://localhost:3000/seguimientos'; // Cambia esta URL por la de tu API

  constructor(private http: HttpClient) {}

  seguir(data: { seguidorId: number; seguidoId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  dejarDeSeguir(data: { seguidorId: number; seguidoId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/dejar-de-seguir`, { body: data });
  }

  // Si necesitas un método para obtener todos los seguimientos de un usuario, puedes agregarlo aquí
  getSeguimientos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
