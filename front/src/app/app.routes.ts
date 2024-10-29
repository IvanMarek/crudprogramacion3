import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { GestionUsuariosComponent } from './user-management/user-management.component';


export const routes: Routes = [
    {path:'', redirectTo: "/login", pathMatch: "full"},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterFormComponent},
    { path: 'inicio', component: InicioComponent},
    {path: 'perfil', component: PerfilComponent},
    { path: 'gestion-usuarios', component: GestionUsuariosComponent },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];
