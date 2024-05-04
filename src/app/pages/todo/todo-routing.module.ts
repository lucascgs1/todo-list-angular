//package
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: 'novo',
    component: TodoFormComponent,
  },
  {
    path: 'detalhe/:id',
    component: TodoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
