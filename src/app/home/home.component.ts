import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

import { ListService } from '../services/lists.service';

/* el estado void es cuando el componente no se encuentra dentro de la vista, esta detached (no está en la vista) */
/* lo estados por defecto no se animan, se debe especificar las transiciones*/
/* en angular hay nombres q estan definidos para la entrada y salida del elemento :enter, :leave*/
/* la forma corta del enter es 'void => *', porque se se va desde void (fuera de la vista) a otro cualquier estado, esa es la entrada. Se puede utilizar :enter*/
/* la forma corta de salida es es '* => void' */
/* el * es un comodin para cualquier otro estado q no sea void */

// @Component({
//   selector: 'app-home',
//   templateUrl:  'home.component.html',
//   animations: [
//   	trigger('enterState',[
//   		state('void',style({
//   			transform: 'translateX(-100%)',
//   			opacity: 0
//   		})),
//   		transition(':enter',[
//   			animate(300,style({
//   				transform: 'translateX(0)',
//   				opacity: 1
//   			}))
//   		])
//   	])
//   ]
// })

// animacion tipo coreografia, se debe agregar un delay en la animacion
// la function query, permite pasar un selector a la funcion y devuelve los elementos q cumplan con ese selector (parecido a queryselector de js)
// query (query de seleccion, lo q se va hacer con esos elementos, json de opciones)
// stagger aplica el delay a cada elemento q se obtuvieron del query
// el optional: true es para q si en algun punto no hay elementos q coinciden con el query de seleccion no envia errores en la consola
@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  animations: [
    trigger('enterState',[
      transition("* => *",[
        query(':enter',[
          style({transform: 'translateX(-100%)',opacity: 0}),
          stagger(50,[
            animate(200,style({transform: 'translateX(0)',opacity: 1}))
          ])
        ],{optional: true})
      ])
     ])
  ]
})
export class HomeComponent implements OnInit {


  constructor(public listS: ListService) {}

  ngOnInit() {
  }
}
