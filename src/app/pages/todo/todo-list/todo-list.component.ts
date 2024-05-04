import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { getPriorityLabelByValue } from 'src/app/core/models/priority';
import { TableColumn } from '../../../core/models/table-column.interface';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent<T> implements OnChanges {
  @Input('show-header') showHeader: boolean = true;
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Output() taskStatus = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  columnFields: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.columnFields = this.columns.map((c) => c.field);
  }

  formatValue(element: any, field: string): string {
    switch (field) {
      case 'priority': {
        return getPriorityLabelByValue(element[field]);
      }
      case 'createdAt': {
        return element[field].toLocaleDateString('pt-br');
      }
      default: {
        return element[field];
      }
    }
  }

  changeTaskStatus(element: any) {
    this.taskStatus.emit(element.id);
  }

  isChecked(element: any): boolean {
    return element.isFinished != null;
  }

  editTask(id: string) {
    this.deleteTask.emit(id);
  }

  removeTask(id: string) {
    this.deleteTask.emit(id);
  }
}
