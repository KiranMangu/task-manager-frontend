import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/taskModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../../../utility.service';
// import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  taskGroup: FormGroup;
  _tasks: Task[];
  _selectedTask: any;
  // @Output() valueChange = new EventEmitter();
  //priorityValue: number = 0;

  constructor(private _tskSrv: TaskService, private _fb: FormBuilder, private _router: Router, private _util: UtilityService) {
    this.taskGroup = this._fb.group({
      task: ['', [Validators.required]],
      priority: [''],
      parentTask: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    }, { validator: this.checkDates });
  }

  get task() {
    return this.taskGroup.get('task');
  }
  displayFn(task) {
    // this._selectedTask = task._id;
    // console.log('dis ' + this._selectedTask);
    return task.task === null ? '' : task.task;
  }
  // get parentTask() {
  //   this._selectedTask = this.taskGroup.get('parentTask');
  //   return "this._selectedTask.task";
  // }
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
    // console.log('task' + task);
    // console.log('priority:' + priority);
    // console.log('startDate' + startDate);
    // console.log('endDate:' + endDate);
    // console.log('parentTask:' + parentTask);
    this._selectedTask = this._tasks.find(task => task.task === parentTask)
    // console.log('parentTask2: ' + this._selectedTask._id);
    this._tskSrv.createTask(task, startDate, endDate, priority, this._selectedTask)
      .subscribe(() => {
        console.log('Inserted');
        this._router.navigate(['/view']);
      })
  }

  getTasks(): any {
    this._tskSrv.getTasks()
      .subscribe((tasks) => {
        console.log(tasks);
        this._tasks = tasks;
      });
  }

  resetField(): void {
    // this.valueChange.emit("0");
    this.taskGroup.reset();
    // this.taskGroup.pristine;
    // this.taskGroup.untouched;
  }

  checkDates(group: FormGroup): any {
    // return this._util.validateDateSelection(group.controls.startDate.value, group.controls.endDate.value);
    return null;
  }
}
