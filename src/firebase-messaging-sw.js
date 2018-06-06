// imports necesarios, estos imports traen tambien el sdk de firebase
// estoy rompe un poco la app, pues mientras todo lo q se instala para usarse con angular se maneja via npm, las versiones de este archvio estan especificados en el nombre del archivo, para actualizarla se tendria q modifcar en este archivo
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');

// se ven en la consola de firebase
// agregar en el angular-cli, en assets, q debe compilar el archivo.
firebase.initializeApp({
  'messagingSenderId': '624924736082'
})

const messaging = firebase.messaging();
