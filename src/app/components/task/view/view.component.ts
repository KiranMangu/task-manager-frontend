import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task'
import { Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  tasks: Task[];
  constructor(private _tskSrv: TaskService, private _router: Router) { }

  ngOnInit() {
    this._tskSrv.getTasks()
      .subscribe((tasks) => {
        console.log(tasks);
        this.tasks = tasks;
        console.log(this.tasks);
      });
  }

  parentTaskName(parentId) {
    let parentTask;
    let parentTaskName = '';

    if (parentId === '' || parentId === undefined)
      parentTask = ''
    else {
      parentTask = this.tasks.find(task => this._returnName(task, parentId));
      // console.log('parentTask: ' + JSON.stringify(parentTask));
      // console.log('taskName ' + (parentTask.task));
      parentTaskName = parentTask.task
    }
    // if (parentTask.task === undefined) {
    //   return '';
    // }
    // else
    //   return parentTask.task;
    // console.log('parentTask ' + JSON.stringify(parentTask));
    // console.log('parentTaskName ' + parentTask.task);
    return parentTask.task;
  }
  _returnName(task, parentId): boolean {
    let tempTask = task;
    // console.log('tempTask._id' + tempTask._id)
    // console.log('parentId' + parentId)
    if (tempTask._id === parentId)
      return true;
    else
      return false;
  }

  editView(taskName) {
    let _selectedTask = this.tasks.find(task => task.task === taskName);
    console.log(_selectedTask._id);
    this._router.navigate(['/edit/', _selectedTask._id]);
    //[routerLink]="['../edit']"
  }
}
