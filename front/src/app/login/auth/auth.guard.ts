import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRole']; // Obtén el rol esperado desde la ruta (puede ser un array)
    const userRole = this.authService.getUserRole(); // Obtén el rol del usuario

    // Si el usuario no está autenticado, redirige al login
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false; // Bloquea el acceso
    }

    // Si expectedRoles es un array, verifica si el rol del usuario está en el array
    if (Array.isArray(expectedRoles)) {
      if (!expectedRoles.includes(userRole)) {
        this.router.navigate(['']); // Redirige si no coincide
        return false;
      }
    } else {
      // Si es un solo rol, compara directamente
      if (userRole !== expectedRoles) {
        this.router.navigate(['']); // Redirige si no coincide
        return false;
      }
    }

    return true; // Permite el acceso si el rol coincide
  }
}
