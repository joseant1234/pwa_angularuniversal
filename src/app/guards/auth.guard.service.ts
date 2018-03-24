// se debe importar injectable para poder inyectar el guard en donde se a utilizar y para q dentro del guard se puede recibir dependencias de externos (librerias, servicios)
import { Injectable } from '@angular/core';
// importa la interface CanActivate y se implementa su metodo canActivate
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      // authState es un observable
      // con take(1), se toma un usuario
      // con la funcion dentro de map se convierte toda la informacion q viene del authState a un boolean
      // do es un operador de los observadores q permite insertar acciones o código en el proceso en q el observador va manejando la información
      // lo q recibe do es el boolean resultado del map
      return this.afAuth.authState.take(1).map((user: firebase.User) => {
        return !!user;
      }).do((authenticated: boolean) => {
        // si no esta authenticado redirct to /login
        if (!authenticated) { this.router.navigate(['/login']); }
      });
  }
}
