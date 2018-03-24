import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

// implements OnInit no es obligatorio, pero se considera una buena práctica
// @Component tiene q estar arriba de la declaracion de la clase o aun lado de esta
// se puede definir la hoja de estilo para el componente, la animación, ....
@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  // se solicita a angular q envie una instancia del servicio AuthService
  // se pide angular q inyecte una instancia del Router
  constructor(private auth: AuthService, private router: Router) {

  }


  // se llama cuando el componente termina de inicializarse
  ngOnInit() {
    // el observador envia informacion a todos aquellos q están suscritos a dicho observador
    // la funcion dentro de subscribe se ejecuta cada vez q el observador envie nuevos datos
    this.auth.getUser().subscribe(console.log);
  }

  login() {
    this.auth.login().then(() => this.router.navigate(['/']));
  }
}
