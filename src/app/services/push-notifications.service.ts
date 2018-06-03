import { Injectable } from '@angular/core';

// todos los metodos del sdk de firebase esta en la prop firebase
import * as firebase from 'firebase';

@Injectable()
export class PushNotificationsService{
  public messaging= firebase.messaging();

  requestPermission() : Promise<void>{
    return this.messaging.requestPermission();
  }
}
