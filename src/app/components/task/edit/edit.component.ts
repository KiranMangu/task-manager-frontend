import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../task';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  _snackBar: MatSnackBar;
  taskId: String;
  _tasks: Task[];
  editTaskGroup: FormGroup;
  constructor(private _tskSrv: TaskService, private _route: ActivatedRoute, private _fb: FormBuilder, private _router: Router) {
    this.editTaskGroup = this._fb.group({
      task: '',
      priority: '',
      startDate: '',
      endDate: '',
      parentTask: ''
    });
  }

  ngOnInit() {
    this.getTasks();
    this._route.params.subscribe(params => {
      console.log('id: ' + params['id']);
      this.taskId = params['id'];
      this.getTaskById(this.taskId);
    });
  }

  getTaskById(taskId): any {
    let taskDetails: Task;
    // console.log('taskDetails-1' + taskId);
    this._tskSrv.getTasksById(taskId).subscribe((task) => {
      taskDetails = task;
      // console.log('taskDetails-2' + JSON.stringify(taskDetails));
      this.editTaskGroup.setValue({
        task: taskDetails.task,
        priority: taskDetails.priority,
        startDate: taskDetails.startDate,
        endDate: taskDetails.endDate,
        parentTask: this.getTaskName(taskDetails.parentTask)
      });
    }
    )
  }

  getTaskName(parentTaskId): Task {
    let taskName: Task;
    // console.log(this._tasks);
    taskName = this._tasks.find(task => task._id === parentTaskId);
    if (taskName === undefined)
      return null;
    else
      return taskName;
  }

  getTasks(): any {
    this._tskSrv.getTasks()
      .subscribe((tasks) => {
        // console.log(tasks);
        this._tasks = tasks;
      });
  }

  updateTask(): any {
    // task, startDate, endDate, priority, parentTask
    // console.log('update id:' + id);
    // console.log('update id:' + this.taskId);
    // console.log (this.editTaskGroup.get('task').value);
    // console.log (this.editTaskGroup.get('priority').value);
    // console.log (this.editTaskGroup.get('parentTask').value._id);
    // console.log (this.editTaskGroup.get('startDate').value);
    // console.log (this.editTaskGroup.get('endDate').value);

    let task = this.editTaskGroup.get('task').value;
    let priority = this.editTaskGroup.get('priority').value;
    let parentTask = this.editTaskGroup.get('parentTask').value == undefined ? null : this.editTaskGroup.get('parentTask').value._id;
    let startDate = this.editTaskGroup.get('startDate').value;
    let endDate = this.editTaskGroup.get('endDate').value;
    let id = this.taskId;

    this._tskSrv.updateTask(task, startDate, endDate, priority, parentTask, id)
      .subscribe((res) => {
        console.log('Snack Bar');
      });
  }

  displayFn(task) {
    return task.task;
  }

  cancelClick(): void {
    this._router.navigate(['/view']);
  }
}
