import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'login-container',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss'],
})
export class LoginContainer implements OnInit, OnDestroy {

  public formError = '';

  private _destroy$: ReplaySubject<number> = new ReplaySubject(1);

  public get checkingData$(): Observable<boolean> {
    return this._auth.checkingDataForLogin$;
  }

  @ViewChild(LoginComponent)
  private _component!: LoginComponent;

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public login(user: IUser): void {
    this._auth.changeLoadingStatus(true);

    this._auth.login(user)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._auth.changeLoadingStatus(false);
          this._component.loginForm.reset();
          this._router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.log(error)
          this._auth.changeLoadingStatus(false);
          const errMessage = error.error?.error.message;
          if (errMessage === 'EMAIL_NOT_FOUND' || errMessage === 'INVALID_PASSWORD') {
            this.formError = 'Incorrect login or password';
          }
        },
      },
      );
  }

}
