import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { IUser } from '../structures/users';

@Injectable()
export class UserService{

  // coleccion. Las colecciones son una instancia de la clase AngularFireStoreColeccion
  private users : AngularFirestoreCollection<IUser>;

  // el constructor se puede usar para inyectar dependencias
  constructor(private afs: AngularFirestore){
    // la base de datos de firestore es orientada a documentos (como en mongodb), las anteriores base de datos de firebase era JSON de gran tamaño en la cual se registraba los datos
    // coleciones -> tablas
    // documentos -> son los filas registradas en cada tabla (registros)
    // Los objetos q se guardan son documentos en las colecciones
    // afs.collections<tipo>('nombre de la coleccion')
    // se crea la coleccion
    this.users = afs.collection<IUser>('users');
  }

  add(user: IUser) : Promise<void>{
    // para agregar un nuevo documento a la coleccion se usa el metodo add, add asignara  un id aleatorio hacia el objeto
    // doc permite agregar, pero se debe pasar como argumento el ID.
    // con set se asgina los datos q se van guardar en la bd
    return this.users.doc(user.uid).set(user).catch(console.log);
  }

}
