import { Injectable } from '@angular/core';

// todos los metodos del sdk de firebase esta en la prop firebase
import * as firebase from 'firebase';

@Injectable()
export class PushNotificationsService{
   // para desuscribirse y conocer el status de la suscripcion (si se activo los permisos, los rechazo, los bloquo, ...) se debe obtner la sw q se registro con firebase
   // ese sw se puede obtener con el objeto navigator


  public messaging = firebase.messaging();

  // la suscripcion es una instancia de la clase pushSuscription q se obtiene del pushManager
  // el pushManager es una propiedad de cada una de la sw registradas y a traves de este se maneja las suscripciones
  // los permisos (configurados en requestPermission tambien se manejan via push manager, pero como se uso la api de firebase lo hace mas sencillo

  getSubscription() : Promise<any>{
    // necesario pues el codigo tambien se ejecuta en el servidor
    if(!navigator) return;

    // se obtiene las servicios worker para el dominio,
    return navigator.serviceWorker.getRegistrations().then(registrations => {
      const firebaseSWs = registrations.filter(sw =>{
        // debe estar activa la sw, y el nombre debe incluir la cadena firebase-messaging
        // en console del browser se puede ver q se registro una sw firebase-messaging.sw, esta es la q se esta buscando
        return sw.active && sw.active.scriptURL.includes("firebase-messaging")
      });

      // se pone en una promsea pues se esta haciendo return de una promise
      // el resultado de la promsea es null si no hay un sw de firebase
      if(firebaseSWs.length < 1) return Promise.resolve(null);
      // se obtiene la instancia de pushSubscription
      return firebaseSWs[0].pushManager.getSubscription();
    });
  }

  cancelPermission() : Promise<any>{
    const subscriptionPro = this.getSubscription();

    // se hace return subscriptionPro, return Promise.resolve(null), para q en conjunto se haga return de la promesa encadenada con la otra promesa
    // el resultado en la ultima promesa de la cadena, si no tiene pushS seria null
    return subscriptionPro.then((pushS : PushSubscription) => {
      if(!pushS) return Promise.resolve(null);

      return pushS.unsubscribe();
    })
  }

  requestPermission() : Promise<void>{
    return this.messaging.requestPermission().then(()=>{
      // el token (identifica al dispositivo) sirve para enviar notificaciones al dispositivo q acitvo las notificaciones
      // firebase no registra la sw hasta lo q considere necesario,
      // firebase no considera necesario registrar la sw cuando se solicata permisos, para obligarlo a q registre la sw se usa la promesa para obtener el token
      return this.messaging.getToken();
    });
  }
}
