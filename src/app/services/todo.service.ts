import { Injectable } from '@angular/core';
//modulo angular para conexiones y configuraciones
import { AngularFirestore, AngularFirestoreCollection } from'angularfire2/firestore';
//observador desde la librería rxjs
import { Observable } from 'rxjs';
//operadores
import { map } from 'rxjs/operators';
//Interfaz
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //creamos 2 propertys - propiedades
  private todosCollection: AngularFirestoreCollection<TaskI>;
  //propiedad con observador
  private todos: Observable<TaskI[]>;
  //constructor que conecta a la bd de firebase
  constructor(db:AngularFirestore) {
    //coleccion que trae las consultas
    //<TaskI>('nombretabla');
    this.todosCollection = db.collection<TaskI>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(map(
      //iterar sobre todos los documents 
      //devuelve un objeto de documentos 
      //para recuperar id
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          // ... propagación
          return { id, ...data };
        });
      }
    ));
  }
  //METODOS CRUD
  //recibe todos los datos
  //del documento-
  getTodos() {
    return this.todos;
  }
  //leer - listar
  getTodo(id:string) {
    return this.todosCollection.doc<TaskI>(id).valueChanges();
  }
  //modificar
  updateTodo(todo:TaskI, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
  //agregar
  addTodo(todo:TaskI) {
    return this.todosCollection.add(todo);
  }
  //eliminar
  removeTodo( id: string ){
    return this.todosCollection.doc(id).delete();
  }
}