import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  taskform: FormGroup;

  pageTitle = '...';
  taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private nav: NavController,
    private overlay: OverlayService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   this.createForm();
   this.Init();
  }

  Init():void{
    const taskId = this.route.snapshot.paramMap.get('id');
    if(!taskId){
      this.pageTitle = 'Create Task';
      return;
    }
    this.taskId = taskId;
    this.pageTitle = 'New Task';
    this.taskService.get(taskId)
    .pipe(take(1))
    .subscribe(({ title, done }) => {
      this.taskform.get('title').setValue(title);
      this.taskform.get('done').setValue(done);
    });
  }

  private createForm(): void{
    this.taskform = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlay.loading({
      message: 'Salvando'
    });
    try {
      const task = !this.taskId
      ? await this.taskService.create(this.taskform.value)
      : await this.taskService.update({
        id: this.taskId,
        ...this.taskform.value
      });
      this.nav.navigateBack('/tasks');
    } catch (e) {
      await this.overlay.toast({
        message: e.message
      });
      
    }finally{
      loading.dismiss();
    }
  }

}
