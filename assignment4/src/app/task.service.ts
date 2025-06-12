import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string, description: string) {
    this.tasks.push({ id: this.idCounter++, title, description });
  }

  editTask(id: number, updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index > -1) this.tasks[index] = updatedTask;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}