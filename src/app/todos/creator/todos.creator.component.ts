import { Component, OnInit } from '@angular/core';

import { ITodo, TStatus } from '../../structures/todos';

@Component({
	selector: 'todo-creator',
	templateUrl: 'todos.creator.component.html'
})
export class TodoCreatorComponent implements OnInit{
	public todo : ITodo = {content: '', status: TStatus.Created };

	ngOnInit(){}
}