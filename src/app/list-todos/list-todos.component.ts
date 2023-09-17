import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { publishFacade } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit{

  errorMessage: string = ''
  todos: Todo[] = [];
  user: any = ''

  constructor(
    private router: Router,
    private todoService: TodoDataService
    ) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('authenticatedUser');
    this.refreshTodos();    
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(this.user, id).subscribe(
      (      response: any) => this.handleSuccessfulDelete(),
      (      error: any) => this.handleErrorResponse(error)
    )
  }

  updateTodo(id: number) {
    this.router.navigate(['todos', id])
  }

  addTodo() {
    this.router.navigate(['todos/new'])
  }
 
  handleSuccessfulRetrieveAll(response: any) {
    this.todos = response;
  }

  handleSuccessfulDelete() {
    this.refreshTodos();
  }

  handleErrorResponse(error: any) {
    this.errorMessage = error.message;
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.user).subscribe(
      response => this.handleSuccessfulRetrieveAll(response),
      error => this.handleErrorResponse(error)
    );
  }
}

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public completed: boolean,
    public targetDate: Date,
    public title: string
  ) {

  }
}
