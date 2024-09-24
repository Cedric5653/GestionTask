import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: any;
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskUpdated = new EventEmitter<any>();

  constructor(private taskService: TaskService) {}

  toggleCompleted() {
    this.task.completed = !this.task.completed;
    this.taskService.updateTask(this.task).subscribe({
      next: (updatedTask) => {
        this.taskUpdated.emit(updatedTask);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        this.taskDeleted.emit(this.task.id);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  onEdit() {
    this.taskUpdated.emit(this.task);
  }
}
