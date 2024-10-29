import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:3000/auth/login';
  private tokenKey = 'authToken';

  private REFRESH_URL = 'http://localhost:3000/api/v1/auth/refresh';
  private refreshTokenKey = 'refreshToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, contrasena: string): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL, {email, contrasena}).pipe(
      tap(response => {
        if(response.token){
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken();
          
          const userRole = this.getUserRole(); // Obtiene el rol del token
          if (userRole === 'Administrador') {
            this.router.navigate(['/inicio']);
          } else if (userRole === 'Administrativo') {
            this.router.navigate(['/inicio']);
          }
        }
      })
    )
  }


  

  private setToken(token: string): void {
    const payload : any = jwtDecode(token);
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem("userId", payload.userId);
  } 

  private getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  } 

  private getRefreshToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.refreshTokenKey);
    }else {
      return null;
    }
  }

  refreshToken(): Observable<any>{
    const refreshToken  = this.getRefreshToken()
    return this.httpClient.post<any>(this.REFRESH_URL, {refreshToken}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken()
        }
      })
    )
  }

  autoRefreshToken(): void {
    const token = this.getToken();
    if(!token){
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    const timeout = exp - Date.now() - (60 * 1000);

    setTimeout(() => {
      this.refreshToken().subscribe()
    }, timeout);
   
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // Retorna el rol
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username; // Asegúrate de que el nombre de usuario esté en el payload del token
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem("userId");
    this.router.navigate(['']);
  }
}