import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { IList } from '../structures/lists';

import * as firebase from 'firebase/app';

@Injectable()
export class ListService {
  public uid: string;
  public listsCollection: AngularFirestoreCollection<IList>;
  public lists: Observable<IList[]>;


  constructor(public afs: AngularFirestore, private auth: AuthService) {
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;

      if (this.uid) { this.setCollection(); }
    });
  }

  setCollection() {
    // users/:uid/lists, se espera q dentro de users/:uid halla una collecion llamada listsCollection
    this.listsCollection = this.afs.collection('users').doc(this.uid).collection<IList>('lists');

    // una diferencia entre snapshotChanges y valueChanges es q el primero envia informacion adicional contenida al JSON, como el id de la lista
    // se va usar map para convertir la respuesta q envia firebae (DocumentReference) en instancias de la interface o tipo IList
    this.lists = this.listsCollection.snapshotChanges().map((actions) => {
      // actions es un arreglo (DocumentChangeAction []) con los elementos q return la consulta, por tanto se va iterar para hacer return de los elementos tipo la interface
      return actions.map(item => {
        const data = item.payload.doc.data() as IList;
        // se puede acceder al id por snapshotChanges()
        const id = item.payload.doc.id;
        // se usa destructuring assignment, se combina la informacion q se obtuvo en data y el id
        return { ...data, id };
      });
    });

  }

  add(list: IList): Promise<any> {
    // si no creado lists, significa q no tiene valor, q no tiene collecion, por tanto no se puede agrear, entonces muestra un error.
    // error: asgina un valor a la collecion antes de intentar guardar un nuevo documento
    if (!this.lists) { throw Error('Set a collection before trying to add a new document'); }
    // asigna a createdAt el timepo del servidor, pero solo cuando llega el nuevo documento
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();

    list.createdAt = createdAt;

    return this.listsCollection.add(list);
  }


}
