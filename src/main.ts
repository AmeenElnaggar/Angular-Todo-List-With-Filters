import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/tasks/tasks.service';

export const TASK_SERVICE_TOEKN = new InjectionToken<TaskService>(
  'tasks-service-token'
);

bootstrapApplication(AppComponent, {
  providers: [{ provide: TASK_SERVICE_TOEKN, useClass: TaskService }],
}).catch((err) => console.error(err));
