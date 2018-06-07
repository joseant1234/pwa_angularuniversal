import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { PushNotificationsService } from '../services/push-notifications.service';

// todos los metodos del sdk de firebase esta en la prop firebase
// import * as firebase from 'firebase';

// luego del router-outlet se inserta los componentes en los cuales se esta navegando o indicando
// router-outlet sive como layout de los framework MVC
// se se va /login, el componente login se inserta luego del router-outlet
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {

  public token : Boolean = false;
  // las prop del componente que son public esta disponible en la vista
  constructor(public afAuth: AngularFireAuth, private router: Router, public pushS: PushNotificationsService) {}

  ngOnInit(){
    // el metodo messagin return una instancia del objecto q permite manipular la subscripcion a la notificaiones push de firebase
    // const messaging= firebase.messaging();
    // lanza la ventana q el usuario debe permitir o bloquer la solicitud de q se pueda reciber notificaciones push
    // Es una mala practica mostrar la solicitud de permitir o bloquear notificaciones push cuando la pagina carga (home), pues orienta al usuario a bloquear o cerrar esas notiicaiones. Debe haber algo en la app q el usuario active (click en algo) para solicitar los permisos y digan para q sirven esas notificaiones
    // si el usuario bloqua la noficaciones, se le puede hacer dificil desbloquear el envio de notificaciones
    // messaging.requestPermission().then(console.log);

    // se va usar el servicio push notification con un boton de campana q permite ver las notificaciones push

    this.pushS.getSubscription().then(console.log)
  }

  requestPushPermission(){
    // imprime el resultado de token de la promesa q se hizo al getToken()
    this.pushS.requestPermission().then(console.log);
  }

  rejectPushPermission(){

  }

  logout() {
    // una vez cerrado sesion, se borra los datos de la sesion en el navegador, y se avisó al servidor remoto q se cerro la sesion y debe de invalidar la sesion
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
