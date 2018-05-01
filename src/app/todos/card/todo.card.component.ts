import { Component, OnInit, Input } from '@angular/core';

import { ITodo } from '../../structures/todos';

@Component({
	selector: 'todo-card',
	templateUrl: 'todo.card.component.html'
})
export class TodoCardComponent implements OnInit{
	@Input() todo : ITodo;

	ngOnInit(){

	}

	completed(){
		console.log('hola')
	}
}