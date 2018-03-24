import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guards/auth.guard.service';


// en router, lazy es carga perezosa, por lo cual no va cargar el componente al cargar el home, sino ese componente y sus dependencias se cargaran cuando se acceda a esa ruta, eso vuelve mas ligero la app, porque no tiene q descargar toda la app al inicio
// export const routes  = [
//   { path: '', component: HomeComponent, pathMatch: 'full'},
//   { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
//   { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
// ]

export const routes  = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
