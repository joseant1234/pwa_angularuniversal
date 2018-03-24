import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

// luego del router-outlet se inserta los componentes en los cuales se esta navegando o indicando
// router-outlet sive como layout de los framework MVC
// se se va /login, el componente login se inserta luego del router-outlet
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {

  // las prop del componente que son public esta disponible en la vista
  constructor(public afAuth: AngularFireAuth, private router: Router) {

  }

  logout() {
    // una vez cerrado sesion, se borra los datos de la sesion en el navegador, y se avisó al servidor remoto q se cerro la sesion y debe de invalidar la sesion
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
