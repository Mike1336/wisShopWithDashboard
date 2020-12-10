import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IFbResponse } from '../interfaces/fb-response';
import { IUser, userRole } from '../interfaces/user';

@Injectable()
export class AuthService {

  private _userRole$ = new ReplaySubject<userRole>(1);

  private _login$ = new ReplaySubject<void>(1);

  private _checkingDataForLogin$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) { }

  public get checkingDataForLogin$() : Observable<boolean> {
    return this._checkingDataForLogin$.asObservable();
  }

  public get userRole$(): Observable<userRole> {
    return this._userRole$?.asObservable()
      .pipe(
        shareReplay(),
        );
  }

  public get login$(): Observable<void> {
    return this._login$.asObservable()
      .pipe(
        shareReplay(),
        );
  }

  public get token(): string | null {
    if (!sessionStorage.getItem('fb-token-exp')) {
      this._userRole$.next('guest');

      return null;
    }
    const now = +(new Date().getTime());
    const expDate = +(new Date(sessionStorage.getItem('fb-token-exp') ?? '').getTime());
    if (now > expDate) {
      this.logout();

      return null;
    }
    this._userRole$.next('admin');

    return sessionStorage.getItem('fb-token');
  }

  public changeLoadingStatus(data: boolean): void {
    this._checkingDataForLogin$.next(data);
  }

  public login(user: IUser): void {
    user.returnSecureToken = true;

    this._http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        environment.apiKey
      }`, user)
      .subscribe({
        next: (response: IFbResponse | any) => {
          this._setToken(response);
          this._login$.next();
        },
        error: (error) => {
          this._login$.error(error);
        },
      });
  }

  public logout(): void {
    this._setToken(null);
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  private _setToken(response: IFbResponse | any): void {
    if (!response || !('idToken' in response)) {
      sessionStorage.clear();
      this._userRole$.next('guest');

      return;
    }

    const now = new Date().getTime();
    const expDate = new Date(now + (+response.expiresIn * 1000));

    sessionStorage.setItem('fb-token', response.idToken);
    sessionStorage.setItem('fb-token-exp', expDate.toString());
    this._userRole$.next('admin');
  }

}
