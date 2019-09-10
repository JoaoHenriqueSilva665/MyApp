import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/tasks.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

  tasks$ : Observable<Task[]>

  constructor() { }

  ngOnInit() {
    this.tasks$ = of([
      { id: '1', title: 'aprender Ionic', done: false},
      { id: '2', title: 'aprender FireStore', done: false}
    ]);
  }

}
