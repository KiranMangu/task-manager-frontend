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
      });
  }
}
