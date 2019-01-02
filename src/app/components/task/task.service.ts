import { Injectable } from '@angular/core';
import { UtilityService } from '../../utility.service';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  uri: String;
  constructor(private _http: HttpClient, private _uri: UtilityService) {
    this.uri = _uri.url;
  }

  getTasks(): any {
    return this._http.get(`${this.uri}/tasks`);
  }

  getTasksById(id): any {
    return this._http.get(`${this.uri}/task/${id}`);
  }

  createTask(task, startDate, endDate, priority, parentTask): any {
    const newTask = {
      task: task,
      startDate: startDate,
      endDate: endDate,
      // finished: finished,
      priority: priority,
      parentTask: parentTask
    }
    return this._http.post(`${this.uri}/task/create`, newTask);
  }

  updateTask(task, startDate, endDate, priority, parentTask, id): any {
    let updateTask = {
      id: id,
      task: task,
      startDate: startDate,
      endDate: endDate,
      priority: priority,
      parentTask: parentTask
    };
    return this._http.post(`${this.uri}/task/update`, updateTask);
  }

  endTask(id): any {
    this._http.get(`${this.uri}/task/complete`, id);
  }
}