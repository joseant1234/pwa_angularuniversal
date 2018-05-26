import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { TodoService } from '../services/todos.service';

import { ITodo } from '../structures/todos';

@Component({
	selector: 'list',
	templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {

	public listId : string;
	public todos : Observable<ITodo[]>;

	// con arrow function si no se pone llaves, sola la linea q se muestra en la hace return de la funcion
	// al eliminar un elemento (swiper) del arreglo se ejecuta una animacion de nuevo, ese elemento lo elimina firebase xq no cumple con el criterio de consulta
	// esta eliminacion hace q la lista se reconstruya y como angular no conoce cuales elementos estaban y cuales se fueron, entonces reconstruye toda lista y por tanto da animacion de entrada a todos los elementos.
	// Ademas esto quiere decir q los esta resinsertando en el DOM, lo cual no es eficiente y perjudica la animacion, para arreglaro se debe definir una funcion para q angular pueda identificar cada elementos q se muestran con ngFor
	// la funcion definida trackTodoObjects recibe un id q le envia angular y un objecto (iterado del ngFor)
	// se debe hacer return de algo q identifique de manera unique esos elementos. Se usa el id del objeto para usarlo como identificador
	trackTodoObjects = (id,obj) => obj.id;

	constructor(private route: ActivatedRoute, private todoS : TodoService) {}

	ngOnInit() {
		this.listId = this.route.snapshot.params.id;

		this.todos = this.todoS.getFromList(this.listId);
	}
}
