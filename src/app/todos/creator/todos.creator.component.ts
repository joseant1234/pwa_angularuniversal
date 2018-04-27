import { Component, OnInit, Input } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';

import { TodoService } from '../../services/todos.service';
import { ITodo, TStatus } from '../../structures/todos';


/* en el state expanded, el height * es un comodin q indica q la altura del elemento sera la q requiera, tambien se puede especifcar una altura */
/* en transition se define de donde a donde va ir la transicion (de estado a estado) para ejecutar la animacion*/
/* */
@Component({
	selector: 'todo-creator',
	templateUrl: 'todos.creator.component.html',
	animations: [
		trigger('openClose',[
			state('collapsed, void',style({height: '0px'})),
			state('expanded',style({height: '*'})),
			transition('collapsed <=> expanded',[animate(300,style({height: '*'})),animate(300)])
		])
	]
	
})
export class TodoCreatorComponent implements OnInit {
	
	@Input() id : string;

	public formState : string = 'collapsed';

	public todo: ITodo = {content: '', status: TStatus.Created };

	constructor(private todoS : TodoService){}

	ngOnInit() {}

	save(){
		this.todoS.add(this.id,this.todo);
	}

	icon(){
		return (this.formState == 'collapsed') ? 'fa-plus' : 'fa-caret-up';
	}

	label(){
		return (this.formState == 'collapsed') ? 'Agregar nuevo pendiente' : 'Ocultar formulario';
	}

	toggleForm(){
		this.formState = (this.formState == 'collapsed') ? 'expanded' : 'collapsed';
	}
}
