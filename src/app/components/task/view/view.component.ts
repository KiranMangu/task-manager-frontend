import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private _tskSrv: TaskService) { }

  ngOnInit() {
    this._tskSrv.getTasks()
    .subscribe((tasks) => {
      console.log(tasks);
    })
  }

}
