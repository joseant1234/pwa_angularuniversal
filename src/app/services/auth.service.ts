import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../structures/users';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

// dado q la liberia no esta diseñada para ts se puede usar la sintaxis mostrada
import * as firebase from 'firebase/app';
// const firebase = require('firebase/app')

// lo q hace el decorador injectable es agregar metadatos a la clase para q luego de agregarle dentro de los providers app.module.ts se puede inyectar como dependencia en los componentes
@Injectable()
export class AuthService {

  // una manera de inyectar dependencias es a traves del constructor
  constructor(private afAuth: AngularFireAuth) {
  }

  getUser(): Observable<IUser> {
    // authState es un observador q envia datos cuando se suscribe a este, permitiendo ver: si el usuario esta logeado, logout, si entro otra vez, ...
    // para q tenga la estructura de IUser se usa map, q toma los datos de q viene del observador, los pasa por una funcion para poner de acuerdo a la estructra de la interface de User
    // take(1) se usa, para decir q de toda la informacion q el observador esta enviando solo interesa el primero, se asegura q sea el primer usuario
    // el filter usado indica q del usuario q se está buscando no sea null
    return this.afAuth.authState
    .take(1)
    .filter(user => !!user)
    .map((user: firebase.User) => {
      return user as IUser;
    });
  }

  login(): Promise<void> {
    // signInWithPopup require como argumento un objecto provider de la clase AuthProvider
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result => {
      console.log(result.user);
    }).catch(console.log);
  }
}
