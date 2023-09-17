import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  @ViewChild('focusfield') focusField!: ElementRef;
  id: number = 0
  user: any = ''
  todo: Todo = new Todo(this.id, '', false, new Date(), '')
  errorMessages: any[] = []
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TodoDataService
    ) { }
  
  ngOnInit(): void {
    this.user = sessionStorage.getItem('authenticatedUser');
    this.id = this.route.snapshot.params['id']

    console.log('id: ' + this.id)
    if (this.id > 0) {
      this.service.retrieveTodo(this.user, this.id).subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
        )
    }
  }

  ngAfterViewInit() {
    if (this.id <= 0) {
      this.focusField.nativeElement.focus();
    }
  }

  handleSuccessfulResponse(response: Todo): void {
    this.todo = response;
  }
  
  handleErrorResponse(error: any): void {
    this.errorMessages = error.error.errors;
  }

  saveTodo() {
    this.errorMessages = [];
    console.log("completed: " + this.todo.completed)
    if (this.id > 0) {
      //update todo
      this.service.updateTodo(this.user, this.id, this.todo).subscribe(
        response => this.handelSuccesfullSave(response),
        error => this.handleErrorResponse(error)
        )
    } else {
      //create todo
      this.service.addTodo(this.user, this.todo).subscribe(
        response => this.handelSuccesfullSave(response),
        error => this.handleErrorResponse(error)
      )
    }
  }

  handelSuccesfullSave(response: Object): void {
    this.router.navigate(['todos']);
  }

}


