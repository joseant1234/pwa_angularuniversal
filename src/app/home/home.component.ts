import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ListService } from '../services/lists.service';

/* el estado void es cuando el componente no se encuentra dentro de la vista, esta detached (no está en la vista) */
/* lo estados por defecto no se animan, se debe especificar las transiciones*/
/* en angular hay nombres q estan definidos para la entrada y salida del elemento :enter, :leave*/
/* la forma corta del enter es 'void => *', porque se se va desde void (fuera de la vista) a otro cualquier estado, esa es la entrada. Se puede utilizar :enter*/
/* la forma corta de salida es es '* => void' */
/* el * es un comodin para cualquier otro estado q no sea void */

@Component({
  selector: 'app-home',
  templateUrl:  'home.component.html',
  animations: [
  	trigger('enterState',[
  		state('void',style({
  			transform: 'translateX(-100%)',
  			opacity: 0
  		})),
  		transition(':enter',[
  			animate(300,style({
  				transform: 'translateX(0)',
  				opacity: 1
  			}))
  		])
  	])
  ]
})
export class HomeComponent implements OnInit {


  constructor(private listS: ListService) {}

  ngOnInit() {
  }
}
