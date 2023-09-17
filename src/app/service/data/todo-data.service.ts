import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retrieveAllTodos(userName: any) {
    return this.http.get<Todo[]>(`${API_URL}/users/${userName}/todos`);
  }

  retrieveTodo(userName: any, id: any) {
    return this.http.get<Todo>(`${API_URL}/users/${userName}/todos/${id}`);
  }

  updateTodo(userName: any, id: any, todo: Todo) {
    return this.http.put(`${API_URL}/users/${userName}/todos/${id}`, todo);
  }

  addTodo(userName: any, todo: Todo) {
    return this.http.post(`${API_URL}/users/${userName}/todos`, todo);
  }

  deleteTodo(userName: any, id: any) {
    return this.http.delete(`${API_URL}/users/${userName}/todos/${id}`);
  }
}
