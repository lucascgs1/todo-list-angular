import { Injectable } from '@angular/core';
import { Task, generateUniqueId } from '../models/task';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  taskList: Task[] = [
    {
      id: generateUniqueId(),
      description: 'teste 1',
      priority: 1,
      createdAt: new Date(),
    },
    {
      id: generateUniqueId(),
      description: 'teste 3',
      priority: 2,
      createdAt: new Date(),
      finishedAt: new Date(),
    },
    {
      id: generateUniqueId(),
      description: 'teste 2',
      priority: 3,
      createdAt: new Date(),
    },
    {
      id: generateUniqueId(),
      description: 'teste 4',
      priority: 2,
      createdAt: new Date(),
    },
  ];

  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(this.taskList);
  }

  getTaskById(id: string): Observable<Task> {
    return of(this.taskList.filter((e) => e.id == id)[0]);
  }

  postTask(task: Task): Observable<any> {
    this.taskList.push(task);

    return of(true);
  }

  putTask(task: Task): Observable<any> {
    this.taskList.filter((e) => e.id == task.id)[0] = task;

    return of(true);
  }

  finishTask(id: string) {
    let selectedTask = this.taskList.filter((e) => e.id == id)[0];

    selectedTask.finishedAt = !selectedTask.finishedAt ? new Date() : undefined;
  }

  deleteTask(id: string): Observable<any> {
    this.taskList.splice(
      this.taskList.findIndex((e) => e.id == id),
      1
    );

    return of(true);
  }
}
