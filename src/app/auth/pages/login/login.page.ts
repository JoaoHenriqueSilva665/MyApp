import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;

  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create a account'

  }

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  constructor(private fb: FormBuilder,) { }

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

  onSubmit():void{
    console.log('Validação de Formulario', this.authForm.value)
  }
}
