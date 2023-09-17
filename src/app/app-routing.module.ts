import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
  {path:'todos', component: ListTodosComponent, canActivate:[RouteGuardService]},
  {path:'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  {path:'todos/:id', component: TodoDetailsComponent, canActivate:[RouteGuardService]},
  {path:'todos/new', component: TodoDetailsComponent, canActivate:[RouteGuardService]},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
