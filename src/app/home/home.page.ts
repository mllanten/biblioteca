import { Component, OnInit } from '@angular/core';
//interface
import { TaskI } from '../models/task.interface';
//service
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: TaskI[]; //array todos (propiedad)
  constructor(private todoService:TodoService) {} //injectamos service
  //metodo ngOnInit
  //llamar al metodo
  //desde el service
  //para recuperar todas las tareas
  ngOnInit(){
    this.todoService.getTodos().subscribe(res => {
      //imprimir la respuesta
      //console.log('Tareas', res);
      this.todos = res
    })
  }

}