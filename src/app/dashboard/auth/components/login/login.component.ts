import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { IUser } from '../../interfaces/user';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public get email(): AbstractControl | null {
    return this.loginForm.get('emailCtl');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('passwordCtl');
  }

  @Input()
  public loadingStatus$!: Observable<boolean>;

  @Input()
  public formError!: string;

  @Output()
  public submitForm: EventEmitter<IUser> = new EventEmitter();

  public loginForm!: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    const user: IUser = {
      email: this.email?.value,
      password: this.password?.value,
    };
    this.submitForm.emit(user);
  }

  private _initForm(): void {
    this.loginForm = new FormGroup({
      emailCtl: new FormControl(null, [
        Validators.email,
        Validators.required,
      ]),
      passwordCtl: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

}
