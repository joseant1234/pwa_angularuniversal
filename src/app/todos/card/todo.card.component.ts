import { Component, OnInit, Input } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';

import { ITodo, TStatus } from '../../structures/todos';

// state 0 es el estado q representa a creado
// state void representa q el elemento no está dentro de la vista
// state 1 es el estado completo
// se usa numeros pues esta q se usan Enums
// en la primera animacion se pone el valor del estado y en la segunda animacion por lo general la duracion de la animacion
@Component({
	selector: 'todo-card',
	templateUrl: 'todo.card.component.html',
	animations:[
		trigger('statusAnimation',[
			state('0,void',style({
				transform: 'translateX(0)',
				opacity: 1
			})),
			state('1',style({
				transform: 'translateX(-100%)',
				opacity: 0
			})),
			transition('0 <=> 1',[
				animate(200,style({transform: 'translateX(0)', opacity: 1})),
				animate(200)
			])
		]),
		trigger('pressAnimation',[
			state('up,void',style({
				transform: 'translateX(0)'
			})),
			state('down',style({
				transform: 'translateX(-100px)'
			})),
			transition('up <=> down',[
				animate(100,style({transform: 'translateX(0)'})),
				animate(100)
			])
		])
	]
})
export class TodoCardComponent implements OnInit{
	@Input() todo : ITodo;
	// down es con el click
	// up no esta haciendo presion en el elemento
	public press : string = 'up';

	ngOnInit(){

	}

	completed(){
		this.todo.status = TStatus.Completed;
	}
}
