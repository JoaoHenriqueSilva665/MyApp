import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  AuthPro = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create a account'

  }

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  constructor(private authService: AuthService ,
              private fb: FormBuilder, 
              private nav: NavController,
              private route: ActivatedRoute,
              private overlay: OverlayService) { }

  ngOnInit():void {
    this.createForm();
  }

  private createForm(): void{
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): FormControl{
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl{
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl{
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void{
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sing Up';
    this.configs.actionChange = isSignIn ? 'create a account' : 'Alredy have a account';
    !isSignIn ? this.authForm.addControl('name', this.nameControl) : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider):Promise<void>{
    const loading = await this.overlay.loading();

    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      this.nav.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/tasks');
    } catch (e) {
      console.log('Erro ao autenticar: ', e);
      await this.overlay.toast({
        message: e.message
      });
    } finally{
      loading.dismiss();

    }
  }
}
