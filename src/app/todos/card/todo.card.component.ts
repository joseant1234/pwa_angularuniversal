import { Component, OnInit, Input } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';

import { ITodo, TStatus } from '../../structures/todos';

import { TodoService } from '../../services/todos.service';

// state 0 es el estado q representa a creado
// state void representa q el elemento no está dentro de la vista
// state 1 es el estado completo
// se usa numeros pues esta q se usan Enums
// en la primera animacion se pone el valor del estado y en la segunda animacion por lo general la duracion de la animacion
// se debe hacer una consulta con where para q no muestre las tareas completas, debido al uso del state lo oculta, pero es necesario hacer la consulta para enviar solo las tareas pendientes por cuestion de performance. Además, si hay 4 elementos y se hace swipe del elemento 3 se veria como visibility: hidden
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
	@Input() listId : string;
	// down es con el click
	// up no esta haciendo presion en el elemento
	public press : string = 'up';

	// se pide al inyector de dependencias q envia la instancia del servicio
	constructor(private todoS : TodoService){}

	ngOnInit(){}

	completed(){
		this.todo.status = TStatus.Completed;
		// se pone en setTimeout porque ocurre un bug en la animacion cuando se hace swipe, se elimina la aniacion, se borran los elementos y se vuelven animar de entrada todos los elementos
		// el setTimeout tiene q ser mas de lo q dura la animacion (200 ms para el swipe)
		setTimeout(()=> this.todoS.update(this.listId,this.todo),400);

	}
}
