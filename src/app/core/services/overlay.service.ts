import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private alertC: AlertController,
    private loadingC: LoadingController,
    private toastC: ToastController) {}

    async alert(options?: AlertOptions): Promise<HTMLIonAlertElement>{
      const alert =  await this.alertC.create(options);
      await alert.present();
      return alert;  
    }

    async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement>{
      const loading = await this.loadingC.create({
        message: "Loading...",
        ...options
      });
      await loading.present();
      return loading;
    } 

    async toast(options?: ToastOptions): Promise<HTMLIonToastElement>{
      const toast = await this.toastC.create({
        position: "bottom",
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'Ok',
        ...options
      });
      await toast.present();
      return toast;

    }
}
