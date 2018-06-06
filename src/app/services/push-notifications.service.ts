import { Injectable } from '@angular/core';

// todos los metodos del sdk de firebase esta en la prop firebase
import * as firebase from 'firebase';

@Injectable()
export class PushNotificationsService{
  public messaging = firebase.messaging();

  requestPermission() : Promise<void>{
    return this.messaging.requestPermission().then(()=>{
      // el token (identifica al dispositivo) sirve para enviar notificaciones al dispositivo q acitvo las notificaciones
      // firebase no registra la sw hasta lo q considere necesario,
      // firebase no considera necesario registrar la sw cuando se solicata permisos, para obligarlo a q registre la sw se usa la promesa para obtener el token
      return this.messaging.getToken();
    });
  }
}
