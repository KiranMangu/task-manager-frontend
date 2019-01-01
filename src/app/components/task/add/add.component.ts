import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  taskGroup: FormGroup;
  _tasks: Task[];
  //priorityValue: number = 0;

  constructor(private _tskSrv: TaskService, private _fb: FormBuilder, private _router: Router) {
    this.taskGroup = this._fb.group({
      task: ['', [Validators.required]],
      priority: [''],
      parentTask: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
  }

  get task() {
    return this.taskGroup.get('task');
  }

  get startDate() {
    return this.taskGroup.get('startDate');
  }
  get endDate() {
    return this.taskGroup.get('endDate');
  }

  ngOnInit() {
    this.getTasks();
  }

  addTask(task, priority, startDate, endDate, parentTask): any {
    console.log('task' + task);
    console.log('priority:' + priority);
    console.log('startDate' + startDate);
    console.log('endDate:' + endDate);
    console.log('parentTask:' + parentTask);
    // this._tskSrv.createTask(task, startdate, enddate, priority, parentTask)
    //   .subscribe(() => {
    //     this._router.navigate['/view'];, startdate, enddate, priority, parentTask
    //   })
  }
  getTasks(): any {
    this._tskSrv.getTasks()
      .subscribe((tasks) => {
        console.log(tasks);
        this._tasks = tasks;
      });
  }
}
