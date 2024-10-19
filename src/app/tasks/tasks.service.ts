import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

// @Injectable({
//   providedIn: 'root',
// })

export class TaskService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();
  private tasksFromLocalStoarge?: Task[];

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: `${Math.random()}`,
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [newTask, ...oldTasks]);
    this.saveTasks();
  }

  constructor() {
    let tasks = localStorage.getItem('Tasks');
    if (tasks) {
      this.tasks.update((oldTasks) => JSON.parse(tasks));
    }
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('Tasks', JSON.stringify(this.tasks()));
  }

  get timeNow(): string {
    return new Intl.DateTimeFormat('en-US').format(new Date());
  }

  removeTasks(taskTitle: string) {
    this.tasks.update((oldTasks) =>
      oldTasks.filter((task) => task.title !== taskTitle)
    );
    this.saveTasks();
  }
}
