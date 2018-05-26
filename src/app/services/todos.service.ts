import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { ITodo } from '../structures/todos';

import * as firebase from 'firebase/app';

// los servicios usan el patron singleton: cada vez q se solicita un servicio se pasa la misma instancia sin importar en punto de la aplicacion se este
// si n componentes tratan de requirir la misma dependencia, a todos se les inserta el mismo objecto
// no se crea mas de 1 objecto del mismo servicio, siempre existe solo uno.
// si se crea un atributo id='dasdads', este siempre se agregaria sin importar en donde este el componente

@Injectable()
export class TodoService{

	// collection es del tipo angularFireCollection y cada elemento es del tipo ITodo
	private collection : AngularFirestoreCollection<ITodo>;
	private ref : Observable<DocumentChangeAction[]>
	private listId : string;

	constructor(private afs : AngularFirestore){}


	setCollection(listId : string){
		this.listId = listId;
		// sin where u ordenanimento solo seria doc(listId).collectin('todos');
		// para un where u ordenamiento se usa una funcion q contiene un objecto al cual se le va a ejecutar la operacion
		// se debe hacer un return del resultado de las operaciones
		this.collection = this.afs.collection('lists')
											.doc(listId)
											.collection('todos',(ref)=>{
												return ref.where('status','==',0);
											});
		// en el servicio list, metodo setCollection se usa snapshotChanges y se itera sobre cada uno de los elementos con map(actions), eso actions son los documentChangeAction
		// se esta guardando todos los objectos de la clase documentChangeAction
		// share es un operador q tienen los observadores, lo q hace es aunque se suscriban varias veces al mismo observador siempre se usa el original o base evitando en este caso cuando se use mas de una vez el async pipe en la vista se crea mas de una suscripcion
		// usando el operador share, al eliminar mas 1 elemento ya no se confunde angular pues ambos async pipe estan usando el mismo observador
		this.ref = this.collection.snapshotChanges().share();
	}

	getFromList(listId : string) : Observable<ITodo[]>{
		if(!this.collection || this.listId != listId) this.setCollection(listId);

		return this.ref.map(actions => {
			return actions.map(item=>{
				const data = item.payload.doc.data() as ITodo;
				const id = item.payload.doc.id;

				return {...data, id};
			})
		})
	}

	add(listId : string, todo : ITodo) : Promise<any>{
		// si no existe la colleccion o q el id enviado no es el mismo al id guardado en el servicio, se debe contruir otra vez la collecion
		// por ejemplo: si se cambia de lista y se envia ese nuevo id, ese id de la nueva lista va ser diferente al id de la lista q se tenia guardado, por tanto se deberia de volver a contruir la collection
		if(!this.collection || this.listId != listId) this.setCollection(listId);

		const createdAt = firebase.firestore.FieldValue.serverTimestamp();

		todo.createdAt = createdAt;

		return this.collection.add(todo);
	}

	update(listId : string, todo: ITodo) : Promise<void>{
		if(!this.collection || this.listId != listId) this.setCollection(listId);

		return this.collection.doc(todo.id).update({status: todo.status});
	}


}
