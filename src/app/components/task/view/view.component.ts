import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/taskModel'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilityService } from '../../../utility.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  tasks: Task[];
  filteredTasks: Task[];
  searchGroup: FormGroup;
  tabSelected: Number = 1;

  constructor(private _tskSrv: TaskService, private _router: Router, private _fb: FormBuilder, private _util: UtilityService) {
    this.searchGroup = this._fb.group({
      taskField: undefined,
      parentTaskField: undefined,
      priorityToField: undefined,
      priorityFromField: undefined,
      startDateField: undefined,
      endDateField: undefined,
    }, { validator: this.checkDates });
  }

  ngOnInit() {
    this._tskSrv.getTasks()
      .subscribe((tasks) => {
        console.log(tasks);
        this.tasks = tasks;
        this.filteredTasks = tasks;
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

  resetFields(): void {
    this.filteredTasks = this.tasks;
    this.searchGroup.reset();
  }

  searchTasks(): void {
    let tempFilteredTask: Task[];

    let taskVal = this.searchGroup.controls['taskField'].value;
    let parentTaskVal = this.searchGroup.controls['parentTaskField'].value;
    let priorityFromVal = this.searchGroup.controls['priorityFromField'].value;
    let priorityToVal = this.searchGroup.controls['priorityToField'].value;
    let startDateVal = this.searchGroup.controls['startDateField'].value;
    let endDateVal = this.searchGroup.controls['endDateField'].value;
    let priorityFrom = priorityFromVal === null ? 0 : priorityFromVal;
    let priorityTo = priorityToVal === null ? 30 : priorityToVal;

    console.log('priorityFromVal: ' + priorityFromVal);
    let startDateDefault = startDateVal == null ? new Date('2018-01-01') : startDateVal;
    let endDateDefault = endDateVal == null ? new Date('2020-01-01') : endDateVal;
    // console.log('startDateDefault: ' + new Date(startDateDefault));
    // console.log('Date: ' + new Date('2018-02-02'));
    // console.log('compare:> ' + (new Date('2018-02-02') > new Date(startDateDefault)));
    // console.log('compare:< ' + (new Date('2018-02-02') < new Date(startDateDefault)));
    // console.log('endDateDefault: ' + endDateDefault);
    // console.log('endDateDefault:< ' + (new Date('2018-02-02') > new Date(endDateDefault)));
    // console.log('endDateDefault:> ' + (new Date('2018-02-02') < new Date(endDateDefault)));

    tempFilteredTask = this.filteredTasks;
    if (taskVal !== null)
      tempFilteredTask = tempFilteredTask.filter(item => item.task.indexOf(taskVal) !== -1);
    if (parentTaskVal !== null)
      tempFilteredTask = tempFilteredTask.filter(item => item.parentTask.indexOf(parentTaskVal) !== -1);

    tempFilteredTask = tempFilteredTask.filter(item => item.priority >= priorityFrom && item.priority <= priorityTo);
    // console.log('priority: ' + JSON.stringify(tempFilteredTask));
    // Temporary fix to avoid in take of blank values of Start or end date.
    // If both are blank case can be handled. 
    // If only one is blank than the it should handle by allowing considering the other extreeme end 
    // if start date not selected then take the give enddate and default start date  
    tempFilteredTask = tempFilteredTask.filter(item => new Date(item.startDate) >= new Date(startDateDefault));
    console.log('Date:' + JSON.stringify(tempFilteredTask));

    tempFilteredTask = tempFilteredTask.filter(item => new Date(item.endDate) <= new Date(endDateDefault));
    // if (startDateVal !== undefined)
    //   tempFilteredTask = tempFilteredTask.filter(item => item.task.indexOf(startDateVal) !== -1);
    // if (endDateVal !== undefined)
    //   tempFilteredTask = tempFilteredTask.filter(item => item.task.indexOf(endDateVal) !== -1);
    console.log('Date:' + JSON.stringify(tempFilteredTask));
    this.filteredTasks = tempFilteredTask;

  }

  checkDates(group: FormGroup): any {
    this._util.validateDateSelection(group.controls.startDateField.value, group.controls.endDateField.value)
      .subscribe((validity) => {
        return validity;
      });
    // return null;
  }
}