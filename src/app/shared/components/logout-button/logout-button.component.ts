import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-buttons>
      <ion-button (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `,
})
export class LogoutButtonComponent implements OnInit {
  @Input() menu: string;

  constructor(
    private menuC: MenuController,
    private auth: AuthService,
    private nav: NavController,
    private overlay: OverlayService
              ) { }

  async ngOnInit(): Promise<void> {
    if(!(await this.menuC.isEnabled(this.menu))){
      this.menuC.enable(true, this.menu);

    }
  }

  async logout(): Promise<void>{
    await this.overlay.alert({
      message: "do you really want to quit?",
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.auth.logout();
            await this.menuC.enable(false, this.menu);
            this.nav.navigateRoot('/login')
          }
        },
        'No'
      ]
    })
  }

}
