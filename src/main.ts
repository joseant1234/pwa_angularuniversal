import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import 'hammerjs'

if (environment.production) {
  enableProdMode();
}

// registrar service worker, se comprueba q solo se ejecuta en el navegador
// al usar angularuniversal se asegura q no se ejecute del lador del servidor
// si se va usar sw de manera manual
// if(navigator && navigator.serviceWorker){
//   navigator.serviceWorker.register('/sw.js')
// }

// para utilizar service worker de angular se debe usar angular 5 + y angular cli 1.6+ (ng -v)


document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
