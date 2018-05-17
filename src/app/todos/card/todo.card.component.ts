import { Component, OnInit, Input } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';

import { ITodo } from '../../structures/todos';

@Component({
	selector: 'todo-card',
	templateUrl: 'todo.card.component.html',
	animations:[
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
		console.log('hola')
	}
}
