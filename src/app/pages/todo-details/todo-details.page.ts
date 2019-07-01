import { Component, OnInit } from '@angular/core';
//Task Interface
import { TaskI } from '../../models/task.interface';
//servicios
import { TodoService } from '../../services/todo.service';
//ruta
import { ActivatedRoute } from '@angular/router';
//navC
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  //creamos propiedad todo
  todo: TaskI = {
    task: '',
    priority: 0
  };
  //propiedad
  todoId = null;

  constructor(
    private route: ActivatedRoute, private nav: NavController,
    private todoService: TodoService, private loadingController: LoadingController
  ) { } //injectamos nuestra ruta, nav, service y loading contr.

  //metodo
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    //si hay algo, devuelve ..
    if(this.todoId){
      //si hay algo llamamos
      //al metodo loadTodo 
      this.loadTodo();
    }
  }

  //metodo cargar
  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....' //le pasamos un objeto mensaje
    });
    //muestra minimodal con 'loading....'
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }
  //guardar
  async saveTodo(){
    const loading = await this.loadingController.create({
      message: 'Saving....' //le pasamos un objeto mensaje
    });    
    //muestra minimodal con 'saving....'
    await loading.present();
    //comprobacion si es que existe id
    if(this.todoId){
      //actualizar
      this.todoService.updateTodo(this.todo, this.todoId).then(()=> { // devuelve una promise o promesa
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      //agregar nuevo
      this.todoService.addTodo(this.todo).then(()=> { // devuelve una promise o promesa
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  //metodo eliminar
  onRemove(idTodo: string){
    //console.log(todo);
    this.todoService.removeTodo(idTodo);
  }

}