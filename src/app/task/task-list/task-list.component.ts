import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: any = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  onTaskDeleted(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  onTaskSaved(task: any) {
    if (this.selectedTask) {
      // Mise à jour de la tâche dans la liste
      const index = this.tasks.findIndex(t => t.id === task.id);
      this.tasks[index] = task;
    } else {
      // Ajout d'une nouvelle tâche à la liste
      this.tasks.push(task);
    }
    this.selectedTask = null;
  }

  onTaskUpdated(task: any) {
    this.selectedTask = task;
  }
}
