import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/tasks.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {

  tasks$ : Observable<Task[]>;

  constructor(private tasksS: TasksService, 
              private nav: NavController,
              private overlay: OverlayService,
              ) {}


    async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlay.loading();
    this.tasks$ = this.tasksS.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }

  onUpdate(task: Task): void{
    this.nav.navigateForward(['tasks','edit',task.id]);
  }

  async onDelete(task: Task): Promise<void>{
    await this.overlay.alert({
      message: `Do You Really want to delete then delete "${task.title}" ? `,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.tasksS.delete(task);
            await this.overlay.toast({
              message: `Task "${task.title}" deleted!`
            });
          }
        },
        'no'
      ]
    });
  }

  async onDone(task: Task): Promise<void>{
    const taskToUpdate = { ...task, done: !task.done};
    await this.tasksS.update(taskToUpdate);
    await this.overlay.toast({
      message: `Task "${task.title}" "${taskToUpdate.done ? 'completed' : 'update'}!"`
    });
  }

}
