import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { Task } from '../../core/models/task';
import {
  PriorityEnum,
  getPriorityLabelByValue,
} from '../../core/models/priority';
import {
  TableColumn,
  todoHeader,
} from '../../core/models/table-column.interface';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private snackbarService: SnackbarService
  ) {}

  public taskList: Task[] = [];
  public taskCompleteList: Task[] = [];
  public displayedColumnsList: TableColumn[] = todoHeader;
  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.todoService.getTasks().subscribe((res) => {
      this.taskList = res
        .filter((e) => !e.finishedAt)
        .sort((a, b) => (a.priority < b.priority ? 1 : -1));
      this.taskCompleteList = res
        .filter((e) => e.finishedAt)
        .sort((a, b) => (a.priority < b.priority ? 1 : -1));
    });
  }

  priorityToLabel(value: PriorityEnum): string {
    return getPriorityLabelByValue(value);
  }

  changeTaskStatus(id: string) {
    this.todoService.finishTask(id);

    return this.getTasks();
  }

  removeTask(id: string) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.getTasks();

      this.snackbarService.open('Tarefa excluida com sucesso!');
    });
  }
}
