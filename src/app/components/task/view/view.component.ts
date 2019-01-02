import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  tasks: Task[];
  constructor(private _tskSrv: TaskService) { }

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
    parentTask = this.tasks.find(task => this._returnName(task, parentId));
    console.log('parentTask ' + JSON.stringify(parentTask));
        // if (parentTask.task === undefined) {
    //   return '';
    // }
    // else
    //   return parentTask.task;
    // console.log('parentTask ' + JSON.stringify(parentTask));
    // console.log('parentTaskName ' + parentTask.task);
    // return 'parentTask.task';
  }
  _returnName(task, parentId): boolean {
    let tempTask = task;
    console.log('tempTask._id' + tempTask._id)
    console.log('parentId' + parentId)
    if (tempTask._id === parentId)
      return true;
    else
      return false;
  }
}
