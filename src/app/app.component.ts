import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  pag:{ url: string, direction: string, icon: string, text: string}[];
  user: firebase.User;

  constructor(
    private auth: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {

      this.pag = [
        { url: '/tasks',direction: 'back', icon: 'checkmark', text: 'Task'},
        { url: '/tasks/create',direction: 'forward', icon: 'add', text: 'New Task'}
      ];

      this.auth.authState$.subscribe(user => (this.user = user));

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
