import { TodoService } from 'src/app/core/services/todo.service';
import { PriorityDTO, priorityOptions } from '../../../core/models/priority';
import { generateUniqueId, Task } from 'src/app/core/models/task';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  priorityList: PriorityDTO[] = priorityOptions;
  todoForm: FormGroup = this.initTodoForm();
  taskData?: Task;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') ?? '';

    if (id) {
      this.getTask(id);
    }
  }

  initTodoForm() {
    return this.fb.group({
      description: [
        this.taskData?.description ?? null,
        [Validators.required, Validators.minLength(6)],
      ],
      priority: [this.taskData?.priority ?? null, Validators.required],
    });
  }

  getTask(id: string) {
    this.todoService.getTaskById(id).subscribe((res) => {
      this.taskData = res;
      this.todoForm = this.initTodoForm();
    });
  }

  onTaskSubmit() {
    if (this.todoForm.valid)
      if (this.taskData) {
        this.taskData.description = this.todoForm.value.description;
        this.taskData.priority = Number.parseInt(this.todoForm.value.priority);

        this.todoService.putTask(this.taskData).subscribe(() => {
          this.router.navigate(['/']);

          this.snackbarService.open('Tarefa atualizada com sucesso!');
        });
      } else {
        this.todoService
          .postTask({
            id: generateUniqueId(),
            description: this.todoForm.value.description,
            priority: Number.parseInt(this.todoForm.value.priority),
            createdAt: new Date(),
          })
          .subscribe(() => {
            this.router.navigate(['/']);

            this.snackbarService.open('Tarefa salva com sucesso!');
          });
      }
  }
}
