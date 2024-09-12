// src/app/task/task.model.ts

export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: Date;
  }
  