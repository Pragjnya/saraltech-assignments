import { Component } from '@angular/core';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTitle = '';
  newDescription = '';
  editId: number | null = null;

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTitle && this.newDescription) {
      this.taskService.addTask(this.newTitle, this.newDescription);
      this.newTitle = '';
      this.newDescription = '';
      this.loadTasks();
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  editTask(task: Task) {
    this.editId = task.id;
    this.newTitle = task.title;
    this.newDescription = task.description;
  }

  saveTask() {
    if (this.editId !== null) {
      this.taskService.editTask(this.editId, {
        id: this.editId,
        title: this.newTitle,
        description: this.newDescription
      });
      this.editId = null;
      this.newTitle = '';
      this.newDescription = '';
      this.loadTasks();
    }
  }
}