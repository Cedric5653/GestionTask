

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() task: any = { title: '', description: '' };
  @Output() taskSaved = new EventEmitter<any>();
  isEditMode: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnChanges() {
    this.isEditMode = !!this.task.id;
  }

  onSave() {
    if (this.isEditMode) {
      // Mise à jour de la tâche existante
      this.taskService.updateTask(this.task).subscribe({
        next: (updatedTask) => {
          this.taskSaved.emit(updatedTask);
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    } else {
      // Création d'une nouvelle tâche
      this.taskService.addTask(this.task).subscribe({
        next: (newTask) => {
          this.taskSaved.emit(newTask);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }
}

